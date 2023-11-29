import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms/openai";
import { config } from "dotenv";

config();

type ResponseData = {
  message: string;
};

const llm = new OpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  maxTokens: 175,
});

export interface Job {
  title: string;
  loc: string;
  highlights?: any;
}

export async function gptContext(data: Job) {
  
  const response = await llm.call(
    "Within 150 characters, what are the most prevalent skills and average salary required for this job given this job description: " +
      data.title +
      " Qualifications: " +
      data.highlights[0].items.join(" ") + 
      " Responsibilities: " +
      data.highlights[1].items.join(" ") +
      " Format salary as a number at the end."
  );

  return response;
}

// export async function GET(request: Request) {

//   const response = await gptContext();

//   return Response.json({
//     response: response,
//   });
// }

export async function POST(request: Request) {
  const object = await request.json();
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const data = await fetch(
    `https://serpapi.com/search.json?engine=google_jobs&q=${object.search}&api_key=312e4ac293ce6ece05ec54c150ecc09ff635f2441331b8e14ba8671f136ab0c6`,
    requestOptions
  );
  const dataJson = await data.json();

  console.log(dataJson);

  return Response.json({
    response: dataJson["jobs_results"]
      .slice(0, 3)
      .map((job: any) => ({
        title: job.title,
        loc: job.location,
        highlights: job.job_highlights,
      })),
  });
}
