require('dotenv').config();

const { createClient } =
require('@supabase/supabase-js');

const supabase =
createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_KEY
);

async function test() {

 const { data, error } =
 await supabase
   .from('funds')
   .select('*')
   .limit(1);

 console.log(error);
 console.log(data);
}

test();