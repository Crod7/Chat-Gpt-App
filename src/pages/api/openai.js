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

  // Sends user input to api and awaits for response from OpenAI
  try {
    
    //conversation.push(`user: ${input}`); // input added to conversation

    // BELOW IS THE OPENAI CALL WE WILL USE A TEST RESPOSNE TO SAVE MONEY
    /*
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(input), // calls function to view and respond to conversation
      temperature: 0.6,
    });*/
    // ACTUAL OPENAI GENERATION AND RESPONSE
    //conversation.push(`ai: ${completion.data.choices[0].text}`); // takes ai response and adds it to conversation
    // Introduce a delay using setTimeout (e.g., 5 seconds)
    const delayInSeconds = 3;
    setTimeout(() => {
      // After the delay, send the AI response
      //res.status(200).json({ result: `ai: ${completion.data.choices[0].text}` });
      res.status(200).json({result: `ai: test`});
    }, delayInSeconds * 1000); // Convert seconds to milliseconds    // TEST RESPONSE
    /*
    conversation.push(`ai: test`);
    res.status(200).json({result: conversation});*/
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
  console.log(input)
  //const conversationPrompt = input.map((item) => `${item}\n`).join('');
  return `
  Respond never using 'ai:' to the following conversation.
  ${input}
  `;
}
