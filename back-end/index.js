const bodyParser = require('body-parser');
const express = require('express');
const app = require('./config/index.js')
const router=require("./routes/index.js")
const cors=require("cors");
require("./config/index.js")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cors());
app.use(router.event);
app.use(router.hall);
app.use(router.user);
app.use(router.movie);
app.use(router.tags);
app.use(router.genres);
app.use(router.times);
app.use(router.payment);
app.use(router.tickets);