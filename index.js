const express = require('express');
const app = express();
const PORT = 3000

const router = require('./router/routes');
require('./db/conn')

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log("App Is Listening to PORT: ", PORT);
})