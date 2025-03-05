const express = require('express');
const route = require('./router/route');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', route);


app.listen(3030, () => {
    console.log('✅ Server start listening http://localhost:3030');
})