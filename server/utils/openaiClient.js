<<<<<<< HEAD
// /server/utils/openaiClient.js
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
=======
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai; 
>>>>>>> 3b71154209ff1a42617f05610d5a346ceb82b5e7
