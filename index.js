const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Airtable = require("airtable");
const app = express();
const port = process.env.PORT || 8080;

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
  var base = new Airtable({ apiKey: "key8zR7SsdB8jUYdH" }).base(
    "appmAiSAho6x4fa6a"
  );
  //CONSOLE LOG REQ.BODY TO SEE DATA.
  base("Table 1").create(
    [
      {
        //ADD DATA HERE LIKE THE NAME ATTRIBUTE
        fields: {
          Name: req.body.name,
          "Roll Number": "T20142",
          Division: 1,
          Year: ["TE"],
          Branch: ["IT"],
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  res.send({ data: req.body });
});

app.listen(port, () => {
  console.log("Running Server at" + port);
});
