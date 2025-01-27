const dotenv = require("dotenv")
const express = require('express');
dotenv.config();

const { appRouter } = require("./routers");

const app = express();
app.use(express.json());
app.use("/", appRouter);

const port = process.env.PORT ?? 3000;
app.listen(port, async () => {
    console.log(`App listening on port ${port}`)
})