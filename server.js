const express = require('express')
const app = express()
const port = 3006
const cors = require('cors')

//Middleware static files
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})


app.get('/', (req, res) => {
    console.log(`You're connected`);
    res.send('Movies server on')
})