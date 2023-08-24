import axios from "axios";
import data from "../../lib/testEvent"
;
const handleClick = async () => {
  const sendData = await axios.post('/api/events', {event: data})
}

export default function Home() {
    return (
      <div>
        Hi
        <button onClick={handleClick}>
          Click here 
        </button>
      </div>
    );
  }