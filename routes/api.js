const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const ApiResponse = require('../helpers/response');

// GET all items
router.get('/items', (req, res) => {
  try {
    const items = Item.getAll();
    const response = ApiResponse.success(items, 'Items retrieved successfully');
    res.json(response);
  } catch (error) {
    const response = ApiResponse.error('Error retrieving items', error.message);
    res.status(500).json(response);
  }
});

// GET paginated items
router.get('/items/paginated', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const items = Item.getAll();
    const totalData = items.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = items.slice(startIndex, endIndex);

    const response = ApiResponse.paginated(paginatedItems, totalData, page, limit, 'Items retrieved successfully');
    res.json(response);
  } catch (error) {
    const response = ApiResponse.error('Error retrieving items', error.message);
    res.status(500).json(response);
  }
});

// GET item by ID
router.get('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const item = Item.getById(id);

    if (!item) {
      const response = ApiResponse.notFound('Item not found');
      return res.status(404).json(response);
    }

    const response = ApiResponse.success(item, 'Item retrieved successfully');
    res.json(response);
  } catch (error) {
    const response = ApiResponse.error('Error retrieving item', error.message);
    res.status(500).json(response);
  }
});

// POST create new item
router.post('/items', (req, res) => {
  try {
    const newItem = Item.create(req.body);
    const response = ApiResponse.success(newItem, 'Item created successfully', null, 201);
    res.status(201).json(response);
  } catch (error) {
    const response = ApiResponse.error('Error creating item', error.message);
    res.status(500).json(response);
  }
});

// PUT update item
router.put('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = Item.update(id, req.body);

    if (!updatedItem) {
      const response = ApiResponse.notFound('Item not found');
      return res.status(404).json(response);
    }

    const response = ApiResponse.success(updatedItem, 'Item updated successfully');
    res.json(response);
  } catch (error) {
    const response = ApiResponse.error('Error updating item', error.message);
    res.status(500).json(response);
  }
});

// DELETE item
router.delete('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = Item.delete(id);

    if (!deletedItem) {
      const response = ApiResponse.notFound('Item not found');
      return res.status(404).json(response);
    }

    const response = ApiResponse.success(deletedItem, 'Item deleted successfully');
    res.json(response);
  } catch (error) {
    const response = ApiResponse.error('Error deleting item', error.message);
    res.status(500).json(response);
  }
});

module.exports = router;
