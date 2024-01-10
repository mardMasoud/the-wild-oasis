import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rwwrahdstdubttudqayz.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3JhaGRzdGR1YnR0dWRxYXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3Mjg4MTUsImV4cCI6MjAyMDMwNDgxNX0.LMboKKEAbYxNeLuDJh-xiNQXzra0LK41iNJMssb5cGE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
