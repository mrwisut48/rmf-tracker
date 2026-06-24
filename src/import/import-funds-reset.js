require("dotenv").config();

const fs = require("fs");
const path = require("path");
const supabase = require("../config/supabase");

const CHUNK_SIZE = 100;

async function run() {

  try {

    console.log("=================================");
    console.log("RMF IMPORT START");
    console.log("=================================");

    //----------------------------------
    // Load JSON
    //----------------------------------

    const jsonPath = path.join(
      __dirname,
      "..",
      "output",
      "funds.json"
    );

    console.log("Loading:", jsonPath);

    const funds = JSON.parse(
      fs.readFileSync(jsonPath, "utf8")
    );

    console.log(
      `Records Found : ${funds.length}`
    );

    //----------------------------------
    // Delete Existing Data
    //----------------------------------

    console.log(
      "Deleting existing records..."
    );

    const { error: deleteError } =
      await supabase
        .from("funds")
        .delete()
        .neq("id", 0);

    if (deleteError) {
      throw deleteError;
    }

    console.log(
      "Delete completed"
    );

    //----------------------------------
    // Insert New Data
    //----------------------------------

    console.log(
      "Importing new records..."
    );

    let inserted = 0;

    for (
      let i = 0;
      i < funds.length;
      i += CHUNK_SIZE
    ) {

      const chunk =
        funds.slice(
          i,
          i + CHUNK_SIZE
        );

      const { error } =
        await supabase
          .from("funds")
          .insert(chunk);

      if (error) {
        throw error;
      }

      inserted += chunk.length;

      console.log(
        `Inserted ${inserted}/${funds.length}`
      );
    }

    //----------------------------------
    // Verify
    //----------------------------------

    const {
      count,
      error: countError
    } = await supabase
      .from("funds")
      .select("*", {
        count: "exact",
        head: true
      });

    if (countError) {
      throw countError;
    }

    console.log(
      "================================="
    );

    console.log(
      `Import Success`
    );

    console.log(
      `Total Records : ${count}`
    );

    console.log(
      "================================="
    );

  } catch (err) {

    console.error(
      "================================="
    );

    console.error(
      "IMPORT FAILED"
    );

    console.error(err);

    console.error(
      "================================="
    );

    process.exit(1);

  }

}

run();