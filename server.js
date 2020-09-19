const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("unhandledException", (err) => {
    console.log("UNHANDLED EXCEPTION!!!!!!");
    console.lot(err);
    process.exit(1);
});

const app = require("./app.js");
dotenv.config({ path: "./config.env" });

const LDB = process.env.LOCAL_DATABASE;
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connection Successfull!!!");
    });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server started at port:${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION    Shutting down....");
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});

process.on("SIGTERM", () => {
    console.log("SIGTERM RECEIVED!!!");
    server.close(() => {
        console.log("Process Terminated");
    });
});
