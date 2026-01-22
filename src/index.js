const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}
startServer();
