import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tghrbmhcztlrpgzbnnsd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnaHJibWhjenRscnBnemJubnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNjEwMjksImV4cCI6MjA4ODkzNzAyOX0.X6eAl9BJ4ClS0V49jmKVCbTvCp3pJ1YrtdwJpraj_ls";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
