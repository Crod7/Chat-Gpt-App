import { config } from 'dotenv';
config();

import { Configuration, OpenAIApi } from "openai";


export function generateChatCompletion() {
    const openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPENAI_KEY
    }));
  
    return openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello ChatGPT" }]
    }).then(res => {
      return res.data.choices[0].message.content;
    });
  }