import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tywdxgkwhyulutxzvrzc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5d2R4Z2t3aHl1bHV0eHp2cnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNTAxMjQsImV4cCI6MjA3MjYyNjEyNH0.JwVjLBjhtZ6wpzAtiNV7tQvqZkigySBG0aF2k1Yn9vM" // ⚠️ Public anon key, safe for frontend
);
