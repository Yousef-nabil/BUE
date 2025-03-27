import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  "https://urjhtgvihhpavaenhiko.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyamh0Z3ZpaGhwYXZhZW5oaWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDk4NTMsImV4cCI6MjA1Nzc4NTg1M30.7Ux0t9MRl6bMW8fC0A-wQaxMiPoIZ_iCcmHCtJf75I0"
);

// Centralized CORS headers
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400", // Cache preflight response for 24 hours
};

export async function PATCH(req: NextRequest) {
  // Handle CORS Preflight Requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  try {
    // Parse request body with error handling
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return new NextResponse(
        JSON.stringify({ 
          error: "Invalid JSON", 
          details: parseError instanceof Error ? parseError.message : "Unknown parsing error" 
        }), 
        {
          status: 400,
          headers: CORS_HEADERS,
        }
      );
    }

    // Validate request body
    const { motor_one_angle, motor_one_dircetion } = body;

    if (!motor_one_angle || !motor_one_dircetion) {
      return new NextResponse(
        JSON.stringify({ 
          error: "Missing required fields", 
          received: Object.keys(body) 
        }), 
        {
          status: 400,
          headers: CORS_HEADERS,
        }
      );
    }

    // Perform Supabase update
    const { data, error } = await supabase
      .from("values")
      .update({ 
        motor_one_angle: Number(motor_one_angle), 
        motor_one_dircetion: motor_one_dircetion 
      })
      .eq("id", 1)
      .select();

    // Handle Supabase errors
    if (error) {
      console.error("Supabase Update Error:", error);
      return new NextResponse(
        JSON.stringify({ 
          error: "Database update failed", 
          details: error.message 
        }), 
        {
          status: 500,
          headers: CORS_HEADERS,
        }
      );
    }

    // Successful response
    return new NextResponse(
      JSON.stringify({ 
        message: "Motor update successful", 
        data 
      }), 
      {
        status: 200,
        headers: CORS_HEADERS,
      }
    );

  } catch (error) {
    // Catch-all error handler
    console.error("Unexpected error:", error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }), 
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}

// Optional: Add logging middleware or error tracking
function logError(error: unknown) {
  console.error("[Motor Update Error]", {
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? error.message : String(error),
  });
}