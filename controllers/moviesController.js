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

    const sql = 'SELECT * FROM movies WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' })
        res.json(results[0])
    })
}






module.exports = {
    index,
    show
}