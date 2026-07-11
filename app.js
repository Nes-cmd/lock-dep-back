const express = require("express");

const app = express();

const testRouter = require("./api/test");

app.use("/api/test", testRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});