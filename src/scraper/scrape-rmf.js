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