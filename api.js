const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET all items
router.get('/items', (req, res) => {
  try {
    const items = Item.getAll();
    res.json({
      success: true,
      data: items,
      message: 'Items retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving items',
      error: error.message
    });
  }
});

// GET item by ID
router.get('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const item = Item.getById(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: item,
      message: 'Item retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving item',
      error: error.message
    });
  }
});

// POST create new item
router.post('/items', (req, res) => {
  try {
    const newItem = Item.create(req.body);
    res.status(201).json({
      success: true,
      data: newItem,
      message: 'Item created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating item',
      error: error.message
    });
  }
});

// PUT update item
router.put('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = Item.update(id, req.body);
    
    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedItem,
      message: 'Item updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating item',
      error: error.message
    });
  }
});

// DELETE item
router.delete('/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = Item.delete(id);
    
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: deletedItem,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
});

module.exports = router;
