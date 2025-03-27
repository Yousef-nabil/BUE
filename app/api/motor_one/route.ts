import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  "https://urjhtgvihhpavaenhiko.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyamh0Z3ZpaGhwYXZhZW5oaWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDk4NTMsImV4cCI6MjA1Nzc4NTg1M30.7Ux0t9MRl6bMW8fC0A-wQaxMiPoIZ_iCcmHCtJf75I0"
);

export async function PATCH(req: NextRequest) {
  // ✅ Handle CORS Preflight Requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204, // No content, just headers
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const body = await req.json();
    const { motor_one_angle, motor_one_dircetion } = body;

    if (!motor_one_angle || !motor_one_dircetion) {
      return new NextResponse(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const { data, error } = await supabase
      .from("values")
      .update({ motor_one_angle, motor_one_dircetion })
      .eq("id", 1)
      .select();

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return new NextResponse(JSON.stringify({ message: "Success", data }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}
