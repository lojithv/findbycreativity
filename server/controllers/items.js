import express from 'express';
import mongoose from 'mongoose';

import Item from '../models/item.js';

const router = express.Router();

export const getItems = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Item.countDocuments({});
        const items = await Item.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: items, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getItemsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const items = await Item.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: items });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getItemsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const items = await Item.find({ name });

        res.json({ data: items });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getItem = async (req, res) => { 
    const { id } = req.params;

    try {
        const item = await Item.findById(id);
        
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createItem = async (req, res) => {
    const item = req.body;

    const newItem = new Item({ ...item, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newItem.save();

        res.status(201).json(newItem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Item with id: ${id}`);

    const updatedItem = { creator, title, message, tags, selectedFile, _id: id };

    await Item.findByIdAndUpdate(id, updatedItem, { new: true });

    res.json(updatedItem);
}

export const deleteItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Item with id: ${id}`);

    await Item.findByIdAndRemove(id);

    res.json({ message: "Item deleted successfully." });
}

export const likeItem = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No item with id: ${id}`);
    
    const item = await Item.findById(id);

    const index = item.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
        item.likes.push(req.userId);
    } else {
        item.likes = item.likes.filter((id) => id !== String(req.userId));
    }

    const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });

    res.status(200).json(updatedItem);
}

export const commentItem = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const item = await Item.findById(id);

    item.comments.push(value);

    const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });

    res.json(updatedItem);
};

export default router;