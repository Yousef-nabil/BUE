import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
let x="https://urjhtgvihhpavaenhiko.supabase.co/";
let y="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyamh0Z3ZpaGhwYXZhZW5oaWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDk4NTMsImV4cCI6MjA1Nzc4NTg1M30.7Ux0t9MRl6bMW8fC0A-wQaxMiPoIZ_iCcmHCtJf75I0";

const supabase = createClient(
  x!,
  y!
);

export async function GET() {
  // Fetch data from Supabase
  const { data, error } = await supabase.from('values').select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
