import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";
import { config } from "dotenv";

config();

type ResponseData = {
  message: string;
};

const llm = new OpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  maxTokens: 100,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("search");

  const data = await fetch(
    `http://localhost:3000/api`
  , {method: "POST", body: JSON.stringify({search: id}), headers: {"Content-Type": "application/json"}});
  const dataJson = await data.json();


  const response = await llm.call(
    "What are the most prevalent skills and average salary required for this job given this job description: " +
      dataJson.response[0].title + " Qualifications: " + dataJson.response[0].highlights["items"], 
  );

  return Response.json({
    response,
  });
}

export async function POST(request: Request) {
  const object = await request.json();
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const data = await fetch(`https://serpapi.com/search.json?engine=google_jobs&q=${object.search}&api_key=312e4ac293ce6ece05ec54c150ecc09ff635f2441331b8e14ba8671f136ab0c6`, requestOptions)
  const dataJson = await data.json();

  console.log(dataJson)

  return Response.json({
    response: dataJson["jobs_results"].slice(0,3).map((job: any) => ({title: job.title, loc: job.location, highlights: job.job_highlights}))
  });
}
