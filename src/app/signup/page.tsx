'use client';
import React, { useState } from 'react';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log('Username:', username, 'Password:', password);
    // You might want to send this data to your server here
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-gray-200 p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-200 p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Sign Up</button>
      </form>
    </main>
  );
}
