require('dotenv').config();

console.log(
  process.env.SUPABASE_URL
);

console.log(
  process.env.SUPABASE_KEY
    ?.substring(0,20)
);