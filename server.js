const express = require('express')
const app = express()
const port = 3006
const cors = require('cors')
const moviesRoute = require('./router/moviesRoute')
const notFound = require('./middlewares/error_404')
const serverError = require('./middlewares/serverError')

//Middleware static files
app.use(express.static('public'))


//Middleware cors
app.use(cors({
    origin: 'http://localhost:5173'
}))

// body parser
app.use(express.json())


//server listener
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})

//middleware
app.use('/api/v1/movies', moviesRoute);

//error 404
app.use(notFound)
//server error
app.use(serverError)
