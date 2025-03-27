import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const x = "https://urjhtgvihhpavaenhiko.supabase.co/";
const y =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyamh0Z3ZpaGhwYXZhZW5oaWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDk4NTMsImV4cCI6MjA1Nzc4NTg1M30.7Ux0t9MRl6bMW8fC0A-wQaxMiPoIZ_iCcmHCtJf75I0";

const supabase = createClient(x, y);

export async function PATCH(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
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
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log(motor_one_angle);

    const { data, error } = await supabase
      .from("values")
      .update({ motor_one_angle, motor_one_dircetion })
      .eq("id", 1)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return new NextResponse(JSON.stringify({ message: "Success", data }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",  // Allow requests from any domain
        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
