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
    const movie_id = Number(req.params.id)
    const { name, text, vote } = req.body

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const updated_at = created_at

    const sql = 'INSERT INTO reviews (name, text, vote, movie_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    const sqlValues = [name, text, vote, movie_id, created_at, updated_at]

    connection.query(sql, sqlValues, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })

        const newReview = {
            id: results.insertId,
            name,
            text,
            vote,
            created_at,
            updated_at
        }

        res.status(201).json({ message: 'Review added succesfully', newReview })
    })
}

module.exports = {
    index,
    show,
    store
}