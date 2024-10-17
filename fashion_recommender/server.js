const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); 
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

async function getFashionSuggestions(inputs) {
  const prompt = `Based on a person with ${inputs.skinColor}, ${inputs.bodyType}, who prefers ${inputs.style}, and is looking for ${inputs.occasion}, suggest some clothing or accessory options.`;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'Could not generate fashion suggestions at this time.';
  }
}

app.post('/fashion-recommendations', async (req, res) => {
  const inputs = req.body;
  const suggestions = await getFashionSuggestions(inputs);
  res.send(suggestions);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
