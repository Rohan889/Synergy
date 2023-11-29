"use client"
import { useParams } from "next/navigation";
import { use, useEffect,useState } from "react";


export default function Page(props: any) {

    const[career, setCareer] = useState(null);
    const [chatgptResponse, setChatgptResponse] = useState(null);

    
   useEffect(() => {
    setCareer(JSON.parse(localStorage?.getItem('career')))
    }, [])

    useEffect(() => {
        var myHeaders = new Headers();
        var val = new URLSearchParams(JSON.stringify(career));
        val.append("search", JSON.stringify(career));
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          URLSearchParams: val,
        };

        console.log(requestOptions.URLSearchParams.get("search"));
        
        fetch("http://localhost:3000/api/", requestOptions)
          .then((result) => {
            console.log(result.response);
            setChatgptResponse(result.response);
          });
    }, [career])

    return (
        <div>
        <h1>{chatgptResponse}</h1>
        </div>
    );
    }