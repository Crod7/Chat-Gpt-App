// Code to start OpenAi
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);




export default async function (req, res) {


  // OpenAI's memory of the conversation, to later be stored on DB
  const conversation = [];


  // Open API Key returns 500 if key is invalid
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  // Checks to see if user input is valid
  const input = req.body.input || '';
  if (input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid input",
      }
    });
    return;
  }



  // Sends user input to api and awaits for response from OpenAI
  try{
    const completion = await openai.createCompletion({
      model: "text-davinci-003", // The most affordable option
      prompt: generatePrompt(input),
      temperature: 0.6,
    });
    console.log(conversation);
    res.status(200).json({ result: completion.data.choices[0].text });
    //res.status(200).json({conversation})
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.resposne.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      })
    }
  }
}

function generatePrompt(input) {
  const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
  return `
  ${capitalizedInput}
  `;
}

// 0.002079