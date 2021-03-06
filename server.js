const express = require("express");
const path = require("path");

const app = express();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

app.use("/core", express.static(path.resolve(__dirname, "app", "core")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "app", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log(`Server is runing at http://localhost:3000`));
