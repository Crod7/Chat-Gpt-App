// Code to start OpenAI
import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



// OpenAI's memory of the conversation, to later be stored on DB
const conversation = [];



export default async function (req, res) {
  // Open API Key returns 500 if key is invalid
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }



  // Checks to see if user input is valid
  const input = req.body.input || '';
  if (input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid input',
      },
    });
    return;
  }



  // Sends user input to api and awaits for response from OpenAI
  try {
    conversation.push(`user: ${input}`); // input added to conversation
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(input), // calls function to view and respond to conversation
      temperature: 0.6,
    });
    conversation.push(`ai: ${completion.data.choices[0].text}`); // takes ai response and adds it to conversation
    res.status(200).json({ result: completion.data.choices[0].text }); // returns ai response



  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.resposne.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}



// Generates the prompt to OpenAI by mapping the entire conversation from the array so that
// OpenAI has the context of the entire discussion and can respond accordingly
function generatePrompt(input) {
  const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
  const conversationPrompt = conversation.map((item) => `${item}\n`).join('');
  return `
  ${conversationPrompt}${capitalizedInput}
  `;
}