import React, { useState } from 'react';

function EntryForm() {
    // Define a state variable to store the user's input
    const [inputValue, setInputValue] = useState('');
  
    // Handle changes in the input field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };
  
    return (
      <div>
        <h2>Info Box</h2>
        <input
          type="text"
          placeholder="Enter info here"
          value={inputValue}
          onChange={handleInputChange}
        />
        <p>You entered: {inputValue}</p>
      </div>
    );
}

export default EntryForm;
