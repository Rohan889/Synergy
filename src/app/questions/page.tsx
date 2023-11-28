'use client';
import React, { useState } from 'react';

//import axios from 'axios';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ratings, setRatings] = useState({});
  const[answered, setAnswered] = useState(''); 
  const jobs = [
    { id: 'a', title: 'Job A' },
    { id: 'b', title: 'Job B' },
    { id: 'c', title: 'Job C' },
    { id: 'd', title: 'Job D' },
    { id: 'e', title: 'Job E' }
  ];

  const questions = ["How Analytical are you?", "Do you like interacting with people?", "How well creative are you?", "How well do you work on a team?", "How much do you enjoy hands on work?", "Do you enjoy working outdoors?", "Do you enjoy travelling?","How much do you value work life balance?"]

  const handleRatingChange = (questions, rating) => {
    setRatings(prevRatings => ({ ...prevRatings, [questions]: rating }));
  };

  const handleButtonClick = async() => {
    const i = localStorage.getItem('username'); 
    console.log("this is " + i); 
    
    
    const ratingsValues = Object.values(ratings).map(value => value.toString()).join('');
    const ratingsNumber = parseInt(ratingsValues, 10);
    localStorage.setItem('ratingsValues', ratingsValues);
    const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:vHPGaF5w/data';

    try {
      const answered = "no"; 
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: i, answers: ratingsNumber}),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      alert("You have successfully signed up to Synergy"); 
      window.location.href = '/results';
      const data = await response.json();
      console.log('API Response:', data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle errors here
    }
    
  };

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
    <div className='flex bg-gray-300 flex-col h-screen text-center '>
      <h1 className='text-black text-xl'>Rate Interests</h1>
      {questions.map(question => (
        <div className='' key={question}>
          <h2 className='text-black text-xl'>{question}</h2>
          {[1, 2, 3, 4, 5].map(rating => (
            <label className='mx-2.5' key={rating}>
              <input
                className='w-8 text-black h-4'
                type="radio"
                name={`rating-${question}`}
                value={rating}
                color='black'
                size={50}
                onChange={() => handleRatingChange(question, rating)}
              />
              {rating}
            </label>
          ))}
        </div>
      ))}
      <div className='my-2.5'>
        <button onClick={handleButtonClick}>Submit Ratings</button>
      </div>
    </div>
  );
}