const express = require('express');
const { VideoSummarize } = require('../controller/controller');
const route = express.Router();

route.post('/summarize', VideoSummarize);

module.exports = route;