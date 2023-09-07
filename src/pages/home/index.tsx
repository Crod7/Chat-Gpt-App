import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from '../../../lib/testEvent';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import EntryForm from '@/src/components/EntryForm';

interface MyResponse {
  content: string;
  message: {
    content: string;
  };
}

export default function Home() {
  const { user, error } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [apiError, setApiError] = useState<Error | null>(null);

  useEffect(() => {

  }, []); 


  return (
    <div>
      {content && <p>Content: {content}</p>}
      {apiError && <p>Error: {apiError.message}</p>}
      <EntryForm />
    </div>
  );
}
