
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from "next/server";

const x="https://urjhtgvihhpavaenhiko.supabase.co/";
const y="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyamh0Z3ZpaGhwYXZhZW5oaWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDk4NTMsImV4cCI6MjA1Nzc4NTg1M30.7Ux0t9MRl6bMW8fC0A-wQaxMiPoIZ_iCcmHCtJf75I0";

const supabase = createClient(
  x!,
  y!
);

export async function PATCH(req: NextRequest) {
    try {
        const last_connect_time=new Date().toISOString();
      const { data, error } = await supabase
        .from("values")
        .update({last_connect_time })
        .eq("id", 1) 
        .select(); 
  
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: "Success", data });
    } catch (error) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
  }