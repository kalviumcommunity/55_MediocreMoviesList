const express = require('express');
const router = express.Router();
router.use(express.json());

// POST route to create a new resource
router.post('/post', (req, res) => {
    try {
        const data = req.body;
        console.log('Data received:', data);
        res.json({ message: 'Resource created successfully', data });
    } catch (err) {
        console.error('Error in POST request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to read data
router.get('/read', (req, res) => {
    try {
        res.status(200).json({ message: 'Data Read Successfully' });
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT route to update data
router.put('/update', (req, res) => {
    try {
        res.status(200).json({ message: 'Data Updated Successfully' });
    } catch (err) {
        console.error('Error in PUT request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE route to delete data
router.delete('/delete', (req, res) => {
    try {
        res.status(200).json({ message: 'Data Deleted Successfully' });
    } catch (err) {
        console.error('Error in DELETE request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
