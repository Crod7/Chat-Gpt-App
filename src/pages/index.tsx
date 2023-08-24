import axios from "axios";
import data from "../../lib/testEvent";

export default function Home() {
  const handlePostEventClick = async () => {

    try {
      await axios.post('/api/events', { event: data });
      console.log('Event posted successfully');
    } catch (error) {
      console.error('Error posting event:', error);
    }
  };

  const handleGetMetricsClick = async () => {
    try {
      const response = await axios.get('/api/metrics');
      const metrics = response.data;
      console.log('Metrics:', metrics);
    } catch (error) {
      console.error('Error getting metrics:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handlePostEventClick}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md'
      >
        POST Event
      </button>
      <button
        onClick={handleGetMetricsClick}
        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md'
      >
        GET Metrics
      </button>
    </div>
  );
}
