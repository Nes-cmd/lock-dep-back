const express = require('express');
const router = express.Router();
const Provider = require("../../models/Provider");
// GET all providers
router.get('/', async (req, res) => {
    try {
        const providers = await Provider.findAll();
        res.json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET provider by ID
router.get('/:id', async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);

        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }

        res.json(provider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE provider
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        const provider = await Provider.create({
            name,
            email,
            phone,
            address,
        });

        res.status(201).json(provider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE provider
router.put('/:id', async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);

        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }

        await provider.update(req.body);

        res.json(provider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE provider
router.delete('/:id', async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.id);

        if (!provider) {
            return res.status(404).json({ error: 'Provider not found' });
        }

        await provider.destroy();

        res.json({
            message: 'Provider deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
