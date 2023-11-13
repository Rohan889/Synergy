'use client';
import React, { useState } from 'react';




export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 
  const check = async(event) => {
    if(username == ""){
        alert("Username is required"); 
      }
      else if(password == ""){
        alert("Password is required"); 
      }
      else{
      event.preventDefault();
      console.log('Username:', username, 'Password:', password);
  
      //Checking if that data was there or not 
      const apiurl1 = 'https://x8ki-letl-twmt.n7.xano.io/api:vHPGaF5w/credentials/checkusername/' + username;
      console.log(apiurl1);  
      try{
            const response1 = await fetch(apiurl1); 
            const data1 = await response1.json();
            if(data1.message == "Not Found"){
                alert("Sorry but you do not have an account"); 
            }
            else{
                if(data1.password != password){
                    alert("Sorry you have entered the wrong password"); 
                }
                else{
                    alert("You have placed the right credentials "); 
                }
            }
            console.log(data1.message); 
            console.log('Check:', data1);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle errors here
          }
  
          
      
      // Define the URL of the API endpoint
        }
  }; 

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Login</h1>
      <form onSubmit={check} className="flex flex-col gap-4" style={{ color: 'blue' }}>

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
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
    </main>
  );
}
