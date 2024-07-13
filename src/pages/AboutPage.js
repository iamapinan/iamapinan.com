import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutPage = () => {
  const [bio, setBio] = useState('');

  useEffect(() => {
    axios.get('https://www.linkedin.com/in/iamapinan/').then(response => {
      setBio(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">About the Author</h1>
      <div className="bio mt-4">
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default AboutPage;