const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const Provider = require('../../models/provider');

// 1. CREATE (POST /api/items)
router.post('/', async (req, res) => {
  try {
    const { name, description, providerId } = req.body;
    const newItem = await Item.create({ name, description, providerId });
    res.status(201).json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. READ ALL (GET /api/items)
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [{ model: Provider, attributes: ['id', 'name'] }]
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. READ ONE (GET /api/items/:id)
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      include: [{ model: Provider, attributes: ['id', 'name'] }]
    });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. UPDATE (PUT /api/items/:id)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, providerId } = req.body;
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.update({ name, description, providerId });
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. DELETE (DELETE /api/items/:id)
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.destroy();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;