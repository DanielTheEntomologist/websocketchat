import express from "express";
import path from "path";
import cors from "cors";

// set app and express settings
const app = express();

// set paths
const __dirname = path.resolve();
const staticPath = path.join(__dirname, "/client");

// set middleware
app.use(express.static(staticPath));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// set views
const views = {
  "": "index.html",
  index: "index.html",
  "index.html": "index.html",
};

// set routes
for (let key in views) {
  app.get("/" + String(key), (req, res) => {
    res.sendFile(path.join(__dirname, views[key]));
  });
}

app.use("*", (req, res) => {
  res.status(404);
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
