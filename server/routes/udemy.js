// routes/course.js
import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/', async (req, res) => {
  const { search } = req.query;

  try {
    const response = await axios.get('https://www.udemy.com/api-2.0/courses/', {
      params: {
        search: search,
        page_size: 12
      },
      auth: {
        username: UDEMY_API_USERNAME,
        password: UDEMY_API_PASSWORD
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching courses from Udemy:", error.message);
    res.status(500).json({ message: "Failed to fetch courses from Udemy", error: error.message });
  }
  
});

export default router;
