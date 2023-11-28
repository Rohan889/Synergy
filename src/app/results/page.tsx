"use client";
import React, { useState } from "react";

//import axios from 'axios';
import Parse from "parse/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [ratings, setRatings] = useState({});
  const jobs = [
    { id: "a", title: "Job A" },
    { id: "b", title: "Job B" },
    { id: "c", title: "Job C" },
    { id: "d", title: "Job D" },
    { id: "e", title: "Job E" },
  ];

  const handleSubmitButton = async () => {
    //Route to the next page
    console.log("Username:", username, "Password:", password);
    try{
      window.location.href = '/results';
      }
      catch(error){
          console.log(error); 
      }

}

  const results = [{"Job Title": "Job A", "Job_Description":"jfkldajslsfkjflaksdjflak;sdjfl;askd","Salary":"100k" },{"Job Title": "Job B", "Job_Description":"jfkldajslsfkjflaksdjflak;sdjfl;askd","Salary":"100k" },{"Job Title": "Job C", "Job_Description":"jfkldajslsfkjflaksdjflak;sdjfl;askd","Salary":"100k"}]

  
  //this is how you would get data.
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", username, "Password:", password);

    // Define the URL of the API endpoint with query parameters
    const apiUrl = "https://x8ki-letl-twmt.n7.xano.io/api:vHPGaF5w/credentials";

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle errors here
    }
  };
  //This is how you post data
  const submit = async (event) => {
    if (username == "") {
      alert("Username is required");
    } else if (password == "") {
      alert("Password is required");
    } else {
      event.preventDefault();
      console.log("Username:", username, "Password:", password);

      //Checking if that data was there or not
      const apiurl1 =
        "https://x8ki-letl-twmt.n7.xano.io/api:vHPGaF5w/credentials/checkusername/" +
        username;
      console.log(apiurl1);
      try {
        const response1 = await fetch(apiurl1);

        const data1 = await response1.json();
        console.log(data1.message);
        if (data1.message == "Not Found") {
          const apiUrl =
            "https://x8ki-letl-twmt.n7.xano.io/api:vHPGaF5w/credentials";

          try {
            const answered = "no";
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password, answered }),
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            alert("You have successfully signed up to Synergy");
            const data = await response.json();
            console.log("API Response:", data);
          } catch (error) {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
            // Handle errors here
          }
        } else {
          alert(
            "This username is already in use. Please choose a different one."
          );
          console.log("yo this object is already in the database");
        }
        console.log("Check:", data1);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        // Handle errors here
      }

      // Define the URL of the API endpoint
    }
  };

  return (
    <div className="flex bg-gray-300 flex-col h-screen text-center ">
      <h1 className="text-black text-xl">Results</h1>
      <div className="flex flex-row justify-between mx-20 h-full mb-44">
        {results.map((result) => (
            // eslint-disable-next-line react/jsx-key
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 h-content">
                <h1 className="text-black text-xl">{result["Job Title"]}</h1>
                <h1 className="text-black text-xl">{result["Job_Description"]}</h1>
                <h1 className="text-black text-xl">{result["Salary"]}</h1>
            </div>
        ))}
      </div>
      <div className="my-2.5">
        <button  onClick={handleSubmitButton} className="bg-blue-500 text-black p-2">Submit</button>
      </div>
    </div>
  );
}
