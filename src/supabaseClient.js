import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gyxzkutfninfpevevgey.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDg2ODM4NiwiZXhwIjoxOTU2NDQ0Mzg2fQ.gAqHTEZ4Ind_HfI_HlT5Q8Y7k0eu7zXcpS4Z3BuoDrY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
