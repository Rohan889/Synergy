"use client";
import React, { useState, useEffect, use } from "react";

//import axios from 'axios';
import Parse from "parse/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST } from "../api/route";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [job1, setjob1] = useState("");
  const [job2, setjob2] = useState("");
  const [job3, setjob3] = useState("");
  const [jobs, setJobs] = useState({});
  const router = useRouter();

  const [postings, setPostings] = useState({});

  const calculateCosineSimilarity = (vectorA, vectorB) => {
    console.log("Vector B", vectorB);
    const val = [];
    for (let key in vectorB) {
      let value = vectorB[key];
      val.push(value);
    }
    vectorB = val;
    var dotProduct = 0.0;
    var normA = 0.0;
    var normB = 0.0;
    for (var i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      normA += Math.pow(vectorA[i], 2);
      normB += Math.pow(vectorB[i], 2);
    }
    console.log(
      "dotProduct: " + dotProduct + " normA: " + normA + " normB: " + normB
    );

    if (normA == 0 || normB == 0) {
      return 0;
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  };

  const findMostSimilar = (userList, databaseList) => {
    var cosineSimilarities = [];
    for (var i = 0; i < databaseList.length; i++) {
      if (databaseList[i] != null) {
        if (
          databaseList[i][0] != undefined &&
          databaseList[i][0] != null &&
          databaseList[i] != null
        ) {
          cosineSimilarities.push(
            calculateCosineSimilarity(userList, databaseList[i][0])
          );
        }
      } else {
        cosineSimilarities.push(-5000);
      }
    }
    console.log("Cosine Similarities", cosineSimilarities);
    //return index of three highest values
    const returnVal = [];
    var maxIndex = 0;
    var maxIndex2 = 0;
    var maxIndex3 = 0;

    for (var i = 0; i < cosineSimilarities.length; i++) {
      if (cosineSimilarities[i] > cosineSimilarities[maxIndex]) {
        console.log(cosineSimilarities[i] > cosineSimilarities[maxIndex]);
        maxIndex = i;
      }
    }
    console.log(maxIndex);
    console.log("Cosine Similarities", cosineSimilarities);
    cosineSimilarities[maxIndex] = -5000;
    for (var i = 0; i < cosineSimilarities.length; i++) {
      if (
        cosineSimilarities[i] > cosineSimilarities[maxIndex2] &&
        i != maxIndex
      ) {
        maxIndex2 = i;
      }
    }
    console.log("Cosine Similarities", cosineSimilarities);
    cosineSimilarities[maxIndex2] = -5000;
    console.log(cosineSimilarities.length);
    for (var i = 0; i < cosineSimilarities.length; i++) {
      console.log("looping");
      if (
        cosineSimilarities[i] > cosineSimilarities[maxIndex3] &&
        i != maxIndex &&
        i != maxIndex2
      ) {
        maxIndex3 = i;
      }
    }
    console.log("Cosine Similarities", cosineSimilarities);
    console.log(maxIndex3);

    returnVal.push(maxIndex);
    returnVal.push(maxIndex2);
    returnVal.push(maxIndex3);

    return returnVal;
  };

  const [ratings, setRatings] = useState({});

  // const sendArraysToFlask = (ratingsList, answeredValues, data1) => {
  //   console.log(ratingsList);
  //   console.log(answeredValues);
  //   fetch("http://localhost:5000/run", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userList: ratingsList,
  //       databaseList: answeredValues,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("This is answer");
  //       console.log(data);
  //       console.log(data1[data[0]].Job);
  //       setjob1(data1[data[0]].Job);
  //       setjob2(data1[data[1]].Job);
  //       setjob3(data1[data[2]].Job);
  //       console.log(data1[data[1]].Job);
  //       console.log(data1[data[2]].Job);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     search: "consultant",
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch("http://localhost:3000/api/", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       setJobs(result);
  //     });
  // };

  useEffect(() => {
    const value = localStorage.getItem("ratingsValues");
    let ratingsList = [];

    if (value) {
      ratingsList = Array.from(value).map((char) => parseInt(char, 10));
    } else {
      console.log("No value found in local storage for 'ratingsValues'");
    }

    const apiurl = "https://x8ki-letl-twmt.n7.xano.io/api:vHPGaF5w/credentials";
    fetch(apiurl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const answeredValues = data.map((item) =>
          item.answered != "no" ? item.answers : null
        );
        //find the three most similar users
        var cosineSimilarities = [];
        console.log("Ratings List", ratingsList);
        console.log("Answered Values", answeredValues);
        const vals = findMostSimilar(ratingsList, answeredValues);
        console.log(vals);
        console.log("JOBS");
        console.log(data[vals[0]].Job);
        console.log(data[vals[1]].Job);
        console.log(data[vals[2]].Job);
        setjob1(data[vals[0]].Job);
        setjob2(data[vals[1]].Job);
        setjob3(data[vals[2]].Job);
        setJobs([data[vals[0]].Job, data[vals[1]].Job, data[vals[2]].Job]);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  useEffect(() => {
    console.log("This is...", jobs);
    if (
      jobs.length == 3 &&
      jobs[0] != null &&
      jobs[1] != null &&
      jobs[2] != null
    ) {
      for (var i = 0; i < 3; i++) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          search: jobs[i],
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:3000/api/", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result.response);
            //Add the results to the postings dictionary with the job title as the key
            setPostings((postings) => ({
              ...postings,
              [result.response[0].search]: result.response,
            }));
          });
      }
    }
  }, [jobs]);
  useEffect(() => {
    console.log("This is postings...", postings);
  }, [postings]);

  const handleSubmitButton = async () => {
    //Route to the next page
    console.log("Username:", username, "Password:", password);
    try {
      window.location.href = "/results";
    } catch (error) {
      console.log(error);
    }
  };

  const results = [
    {
      "Job Title": "Job A",
      Job_Description: "jfkldajslsfkjflaksdjflak;sdjfl;askd",
      Salary: "100k",
    },
    {
      "Job Title": "Job B",
      Job_Description: "jfkldajslsfkjflaksdjflak;sdjfl;askd",
      Salary: "100k",
    },
    {
      "Job Title": "Job C",
      Job_Description: "jfkldajslsfkjflaksdjflak;sdjfl;askd",
      Salary: "100k",
    },
  ];

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
    <div className="flex bg-gray-300 flex-col h-full text-center ">
      {job1 != "" && job2 != "" && job3 != "" ? (
        <div>
          <h1 className="text-black text-xl">Results</h1>
          <div className="flex flex-row justify-between mx-20 h-full mb-44">
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 h-content">
              {postings[job1]?.map((career) => (
                // eslint-disable-next-line react/jsx-key
                <div className="flex flex-col justify-start shadow-lg my-20">
                  <h1 className="text-black text-xl"> Title: {career.title}</h1>
                  <h1 className="text-black text-xl">
                    <h1>Responsibilities</h1>
                    {career.highlights[1]["items"].map((highlight) => (
                      // eslint-disable-next-line react/jsx-key
                      <div> - {highlight}</div>
                    ))}
        
                  
                  </h1>
                  <h1 className="text-black text-xl">{career.title}</h1>
                </div>
              ))}
            </div>
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 h-content">
            {postings[job1]?.map((career) => (
                // eslint-disable-next-line react/jsx-key
                <div className="flex flex-col justify-start shadow-lg my-20" 
                onClick={()=> {
                  localStorage.setItem("career", JSON.stringify(career))
                  router.push("/learn")
  
                  //pass career object to learn page as string 
                

                }}>
                  <h1 className="text-black text-xl"> Title: {career.title}</h1>
                  <h1 className="text-black text-xl">
                    <h1>Responsibilities</h1>
                    {career.highlights[1]["items"]?.map((highlight) => (
                      // eslint-disable-next-line react/jsx-key
                      <div> - {highlight}</div>
                    ))}
        
                  
                  </h1>
                  <h1 className="text-black text-xl">{career.title}</h1>
                </div>
              ))}
            </div>
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 h-content">
              {postings[job3]?.map((career) => (
                // eslint-disable-next-line react/jsx-key
                <div className="flex flex-col justify-start shadow-lg my-20">
                  <h1 className="text-black text-xl"> Title: {career.title}</h1>
                  <h1 className="text-black text-xl">
                    <h1>Responsibilities</h1>
                    {career.highlights[1]["items"].map((highlight) => (
                      // eslint-disable-next-line react/jsx-key
                      <div> - {highlight}</div>
                    ))}
        
                  
                  </h1>
                  <h1 className="text-black text-xl">{career.title}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="my-2.5">
            <button
              onClick={handleSubmitButton}
              className="bg-blue-500 text-black p-2"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-black text-xl">Loading...</h1>
        </div>
      )}
    </div>
  );
}
