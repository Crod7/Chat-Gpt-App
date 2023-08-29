import React, { useState } from 'react';
import axios from 'axios';
import data from '../../../lib/testEvent';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

interface TimeseriesData {
  [timestamp: string]: {
    totalOpens: number;
    time: string;
  };
}
interface MetricsData {
  countryCount: any;
  deviceCount: any;
  timeseries: TimeseriesData;
}

export default function Home() {
  const { user, error } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null);

  const handlePostEventClick = async () => {
    if (isLoading) return; // Don't allow button press if loading is in progress

    setIsLoading(true); // Start loading

    // Update the timestamp to the current time before sending
    const eventData = {
      ...data,
      timestamp: new Date().toISOString()
    };

    try {
      await axios.post('/api/events', { event: eventData });
      console.log('Event posted successfully');
    } catch (error) {
      console.error('Error posting event:', error);
    } finally {
      setIsLoading(false); // Stop loading
      handleGetMetricsClick()
    }
  };

  const handleGetMetricsClick = async () => {
    if (isLoading) return; // Don't allow button press if loading is in progress

    setIsLoading(true); // Start loading

    try {
      const response = await axios.get('/api/metrics');
      const metrics = response.data;
      console.log('Metrics:', metrics);
      setMetricsData(metrics);
    } catch (error) {
      console.error('Error getting metrics:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };



  return (
    <div>
      <button
        onClick={handlePostEventClick}
        className={`${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        } bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md`}
      >
        POST Event
      </button>
      <button
        onClick={handleGetMetricsClick}
        className={`${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        } bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md`}
      >
        GET Metrics
      </button>
      {/* Display metrics data if available */}
      {metricsData && (
        <div>
          <h2>Metrics Data:</h2>
          <p>Country Count: {JSON.stringify(metricsData.countryCount)}</p>
          <p>Device Count: {JSON.stringify(metricsData.deviceCount)}</p>
          {Object.keys(metricsData.timeseries).length > 0 ? (
            <div>
              <p>Timeseries(UTC):</p>
              <ul>
                {Object.keys(metricsData.timeseries).reverse().map((timestamp:any, index) => (
                  <li key={index}>
                    {`Time: ${metricsData.timeseries[timestamp].time}, Total Opens: ${metricsData.timeseries[timestamp].totalOpens}`}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Grab Time Series</p>
          )}
        </div>
      )}
    </div>
  );
}
