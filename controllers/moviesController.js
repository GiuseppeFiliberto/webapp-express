const connection = require('../data/db')

function index(req, res) {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })

        console.log(results);
        res.json(results)
    })
}

function show(req, res) {

    const id = req.params.id

    const sqlMovie = 'SELECT * FROM movies WHERE id = ?'
    const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?'

    connection.query(sqlMovie, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' })

        connection.query(sqlReviews, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Query Failed' })
            const movie = movieResults[0]
            movie.reviews = reviewResults
            res.json(movie)
        })
    })
}

function store(req, res) {
    const { movie_id, reviewer, content } = req.body

    if (!movie_id || !reviewer || !content) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    const sql = 'INSERT INTO reviews (movie_id, reviewer, content) VALUES (?, ?, ?)'
    connection.query(sql, [movie_id, reviewer, content], (err, result) => {
        if (err) return res.status(500).json({ error: 'Insert Failed' })
        res.status(201).json({ message: 'Review added', review_id: result.insertId })
    })
}

module.exports = {
    index,
    show,
    store
}