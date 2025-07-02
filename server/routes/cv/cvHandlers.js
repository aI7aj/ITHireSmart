import fs from "fs";
import path from "path";
import mammoth from "mammoth"; // for .docx
import pdfParse from "pdf-parse"; // for .pdf
import { openai } from "../../utils/openaiClient.js";
import { fileURLToPath } from "url";
import Profile from "../../models/Profile.js";
import Tesseract from "tesseract.js"; // for image OCR

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractText = async (filePath, mimetype) => {
    if (mimetype === "application/pdf") {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        return data.text;
    }

    if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const buffer = fs.readFileSync(filePath);
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    }

    if (mimetype.startsWith("image/")) {
        const { data: { text } } = await Tesseract.recognize(filePath, "eng");
        return text;
    }

    throw new Error("Unsupported file type.");
};

export const analyzeCV = async (req, res) => {
    try {
        const { file } = req;

        if (!file) return res.status(400).json({ message: "No file uploaded." });

        const rawText = await extractText(file.path, file.mimetype);

        const gptPrompt = `
You will be given a resume text. Extract the following:
1. Skills (list)
2. Work experience (company names, roles, years)
3. Education (degrees, institutions)

Return the result as JSON:
{
  "skills": [],
  "experience": [],
  "education": []
}
CV content:
${rawText}
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a CV parser and extractor bot." },
                { role: "user", content: gptPrompt },
            ],
            temperature: 0.2,
        });

        const json = JSON.parse(response.choices[0].message.content);

        const transformedExperience = (json.experience || []).map((exp) => ({
            title: exp.title || "",
            company: exp.company || "",
            location: exp.location || "",
            from: new Date(exp.from || Date.now()),
            to: exp.to ? new Date(exp.to) : null,
            current: !exp.to,
            description: exp.description || "",
        }));

        const transformedEducation = (json.education || []).map((edu) => ({
            school: edu.school || "",
            degree: edu.degree || "",
            fieldofstudy: edu.fieldofstudy || "",
            from: new Date(edu.from || Date.now()),
            to: edu.to ? new Date(edu.to) : null,
            current: !edu.to,
        }));

        const profile = await Profile.create({
            user: req.user?._id || mongoose.Types.ObjectId(), // Use req.user from auth middleware if available
            status: "Analyzed",
            skills: json.skills || [],
            experience: transformedExperience,
            education: transformedEducation,
          });

        res.status(200).json({
            message: "CV analyzed and saved successfully.",
            data: profile,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "CV analysis failed." });
    }
};
