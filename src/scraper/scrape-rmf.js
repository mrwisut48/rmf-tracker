/*
const axios = require("axios");
const fs = require("fs");

async function test() {

    const response = await axios.get(
        "https://siamchart.com/fund-compare/RMF"
    );

    console.log(
        "HTML Length:",
        response.data.length
    );

    fs.writeFileSync(
        "./src/output/page.html",
        response.data
    );

    console.log("Saved");
}

test();
*/
const axios = require("axios");
const fs = require("fs");

async function test() {

    const response = await axios.get(
        "https://siamchart.com/fund-compare/RMF",
        {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",

                "Accept":
                    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",

                "Accept-Language":
                    "en-US,en;q=0.9",

                "Referer":
                    "https://www.google.com/"
            },

            timeout: 30000
        }
    );

    console.log(
        "HTML Length:",
        response.data.length
    );

    fs.mkdirSync(
        "./src/output",
        { recursive: true }
    );

    fs.writeFileSync(
        "./src/output/page.html",
        response.data
    );

    console.log("Saved");
}

test().catch(err => {
    console.error(err.response?.status);
    console.error(err.message);
    process.exit(1);
});