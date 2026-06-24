const fs = require("fs");

const html = fs.readFileSync(
  "./src/output/page.html",
  "utf8"
);

const start =
  html.indexOf("var real_data =");

if (start === -1) {
  console.log("real_data not found");
  process.exit();
}

const arrayStart =
  html.indexOf("[", start);

const arrayEnd =
  html.indexOf("];", arrayStart);

if (arrayEnd === -1) {
  console.log("Array end not found");
  process.exit();
}

const rawArray =
  html.substring(
    arrayStart,
    arrayEnd + 1
  );

console.log(
  "Array Length:",
  rawArray.length
);

const realData =
  eval(rawArray);

console.log(
  "Rows:",
  realData.length
);

console.log(
  "First Fund:",
  realData[0][0]
);

//Generate fund.js 
const funds = realData.map(row => ({
  fund_name: row[0],
  fund_code: row[1],
  short_name: row[2],
  description: row[3],
  nav_date: row[4],

  one_week: parseFloat(row[5]),
  two_weeks: parseFloat(row[6]),
  one_month: parseFloat(row[7]),
  three_months: parseFloat(row[8]),
  six_months: parseFloat(row[9]),
  one_year: parseFloat(row[10]),
  three_years: parseFloat(row[11]),
  five_years: parseFloat(row[12]),

  fund_type: row[13]
}));

fs.writeFileSync(
  "./src/output/funds.json",
  JSON.stringify(
    funds,
    null,
    2
  ),
  "utf8"
);

console.log(
  "Funds Saved:",
  funds.length
);