import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPEN_AI_API;
const endpoint = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

async function generateResponse(messages: any[]) {
  try {
    const response = await axios.post(endpoint, {
      messages: messages,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const reply = response.data.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred.';
  }
}

export default generateResponse;
