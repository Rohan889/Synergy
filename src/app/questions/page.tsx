'use client';
import React, { useState } from 'react';

//import axios from 'axios';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 

  //this is how you would get data. 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Username:', username, 'Password:', password);

    // Define the URL of the API endpoint with query parameters
    const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:vHPGaF5w/credentials'; 

    try {
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('API Response:', data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle errors here
    }
  };
  //This is how you post data 
  const submit = async (event) =>{
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
          console.log(data1.message); 
          if(data1.message == "Not Found"){
            const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:vHPGaF5w/credentials';

            try {
              const answered = "no"; 
              const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password,answered }),
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              alert("You have successfully signed up to Synergy"); 
              const data = await response.json();
              console.log('API Response:', data);
            } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
              // Handle errors here
            }
          }
          else{
            alert("This username is already in use. Please choose a different one.");
            console.log("yo this object is already in the database");
          }
          console.log('Check:', data1);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          // Handle errors here
        }

        
    
    // Define the URL of the API endpoint
      }
  };
  

  return (
    <div>
    <h1>Questions</h1>
    <h1> Why do you want to learn</h1>
    
    </div>
  );
}
