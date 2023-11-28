import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from "langchain/llms/openai";
import { config } from 'dotenv';

config();
 
type ResponseData = {
  message: string
}

const llm = new OpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  maxTokens: 64,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('itemId')

  const data = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  const dataJson = await data.json()

  const response = await llm.call("What are the most prevalent skills required for this job given this job description: "+dataJson.text)
  
  return Response.json({
    response
  })
}