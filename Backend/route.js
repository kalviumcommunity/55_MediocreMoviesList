const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('./MovieSchema');
const cors = require('cors');

router.use(express.json());
router.use(cors());

// POST route to create a new movie entity
router.post('/add', async (req, res) => {
    try {
        const hasSequel = req.body.hasSequel === 'true';
        const newMovie = await Movie.create({
            ...req.body,
            hasSequel: hasSequel
        });
        console.log('New movie created:', newMovie);
        res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
    } catch (err) {
        console.error('Error in POST request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to read all movies
router.get('/read', async (req, res) => {
    try {
        const movies = await Movie.find(); 
        res.status(200).json(movies);
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to read a specific movie by ID
router.get('/read/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); 
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT route to update a movie by ID
router.put('/update/:id', async (req, res) => {
    try {
        const hasSequel = req.body.hasSequel === 'true';
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
            ...req.body,
            hasSequel: hasSequel
        }, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        console.log('Movie updated:', updatedMovie);
        res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
    } catch (err) {
        console.error('Error in PUT request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE route to delete a movie by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id); 
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        console.log('Movie deleted:', deletedMovie);
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
        console.error('Error in DELETE request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
