const express = require('express');
const router = express.Router();
const mongoose = require('../db/conn')
const Articals = require('../models/articals')
router.post('/articles', async (req, res) => {
    try {
        console.log("req.body>>>>", req.body);
        let obj = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
        }
        const newArticle = await Articals.create(obj);
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all Articles
router.get('/articles', async (req, res) => {
    try {
        const articles = await Articals.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Edit Article
router.put('/articles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category } = req.body;
        const updatedArticle = await Articals.findByIdAndUpdate(id, { title, description, category }, { new: true });
        res.json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Article
router.delete('/articles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Articals.findByIdAndDelete(id);
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search Articles
router.get('/articles/:search', async (req, res) => {
    try {
        const { search } = req.params;
        const articles = await Articals.find({
            $or: [
              { title: { '$regex': `${search}`, '$options': 'i' } },
              { description: { '$regex': `${search}`, '$options': 'i' } },
              { category: { '$regex': `${search}`, '$options': 'i' } },
            ]
          });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Sort Articles by date
router.get('/articles/sort', async (req, res) => {
    try {
        const articles = await Articals.find().sort({ createdAt: -1 });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router