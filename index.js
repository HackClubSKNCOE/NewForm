const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Airtable = require("airtable");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();

const publicFolder = path.join(__dirname, "public");
const viewPath = path.join(__dirname, "views");
console.log(__dirname);

app.set("view engine", "html");
app.set("views", viewPath);

app.use(express.static(publicFolder));

var jsonParser = bodyParser.json();

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname + "/views" });
});

app.post("/api/airtable", jsonParser, function (req, res) {
  var base = new Airtable({ apiKey: process.env.apiKey }).base(
    process.env.baseKey
  );

  //CONSOLE LOG REQ.BODY TO SEE DATA.
  base("Table 1").create(
    [
      {
        //ADD DATA HERE LIKE THE NAME ATTRIBUTE
        fields: {
          Name: req.body.name,
          "Roll Number": req.body.rollno,
          Division: req.body.division,
          Year: req.body.year,
          Branch: req.body.branch,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        res.status(400).send({ err });
      } else {
        res.status(200).send({ data: records[0].fields });
      }
    }
  );
});

app.listen(port, () => {
  console.log("Running Server at" + port);
});
