import { NextRequest, NextResponse } from "next/server";

const SERP_API_KEY = process.env.SERP_API_KEY;
const SERP_API_URL = "https://serpapi.com/search";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || typeof q !== "string") {
    return new NextResponse(
      JSON.stringify({
        message: 'Query parameter "q" is required and must be a string.',
      }),
      { status: 400 }
    );
  }

  if (!SERP_API_KEY) {
    console.error("SerpAPI key is undefined. Please check your .env.local file.");
    return new NextResponse(
      JSON.stringify({ message: "SerpAPI key is not configured." }),
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${SERP_API_URL}?q=${encodeURIComponent(q)}&engine=bing&api_key=${SERP_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    console.error("SerpAPI request error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
