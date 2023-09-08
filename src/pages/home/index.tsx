import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Home() {
  const {user, error} = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const[userInput, setUserInput] = useState("");
  const[ result, setResult ] = useState("");

  async function onSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    try {
      // We attempt to send the users input to openai for a resposne
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ input: userInput}),
      });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    setResult(data.result);
    setUserInput("");
    } catch(error) {
      console.log(error);
      //alert(error.message);
    }
  }




  return (
    <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>

        <div>{result}</div>

    </div>
  );
}
