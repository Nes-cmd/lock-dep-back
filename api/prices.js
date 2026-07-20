const express = require('express');
const router = express.Router();
const Price = require('../models/Price');

// GET all prices
router.get('/', async (req, res) => {
    try {
        const prices = await Price.findAll();
        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a single price by ID
router.get('/:id', async (req, res) => {
    try {
        const price = await Price.findByPk(req.params.id);
        if (!price) {
            return res.status(404).json({ error: 'Price not found' });
        }
        res.json(price);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new price
router.post('/', async (req, res) => {
    try {
        const { item_id, price, date } = req.body;
        const newPrice = await Price.create({ item_id, price, date });
        res.status(201).json(newPrice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT (update) a price by ID
router.put('/:id', async (req, res) => {
    try {
        const price = await Price.findByPk(req.params.id);
        if (!price) {
            return res.status(404).json({ error: 'Price not found' });
        }
        await price.update(req.body);
        res.json(price);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a price by ID
router.delete('/:id', async (req, res) => {
    try {
        const price = await Price.findByPk(req.params.id);
        if (!price) {
            return res.status(404).json({ error: 'Price not found' });
        }
        await price.destroy();
        res.json({ message: 'Price deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;