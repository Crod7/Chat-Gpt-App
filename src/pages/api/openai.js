// Code to start OpenAI
import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
  console.log(req.body.input);

  // Sends user input to api and awaits for response from OpenAI
  try {

    // BELOW IS THE OPENAI CALL WE WILL USE TO GET A CHATGPT RESPONSE
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(input),
      temperature: 0.6,
    });
    res.status(200).json({ result: ` ai: ${completion.data.choices[0].text}` });

      /* BELOW IS THE TEST RESPONSE USED DURING TESTING TO SAVE MONEY
        WE USE A SETTIMEOUT DELAY TO MIMIC CHATGPT RESPONSE TIME*/
      // After the delay, send the AI response
      // Introduce a delay using setTimeout (e.g., 5 seconds)
      //const delayInSeconds = 3;
      //setTimeout(() => {
      //res.status(200).json({ result: ` ai: test` });
    //}, delayInSeconds * 1000); // Convert seconds to milliseconds    // TEST RESPONSE

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
  console.log(input);
  //const conversationPrompt = input.map((item) => `${item}\n`).join('');
  return `
  Respond never using 'ai:' to the following conversation.
  ${input}
  `;
}
