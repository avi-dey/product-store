// const express = require('express'); // old way
import express from "express"; // es6 way

const app = express();

app.listen(5000, ()=> {
    console.log("server started at https://localhost:5000")
})