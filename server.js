const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI('AIzaSyCmvZmp1wjzLHqA-Uzx16kalkriSrVJEmM');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Error fetching AI response:', error);
    res.status(500).json({ error: 'Error fetching AI response' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
