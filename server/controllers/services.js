import express from 'express';
import mongoose from 'mongoose';

import Service from '../models/service.js';

const router = express.Router();

export const getServices = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Service.countDocuments({});
        const services = await Service.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: services, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getServicesBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const services = await Service.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: services });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getServicesByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const services = await Service.find({ name });

        res.json({ data: services });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getService = async (req, res) => { 
    const { id } = req.params;

    try {
        const service = await Service.findById(id);
        
        res.status(200).json(service);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createService = async (req, res) => {
    const service = req.body;

    const newService = new PostMessage({ ...service, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newService.save();

        res.status(201).json(newService);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateService = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No service with id: ${id}`);

    const updatedService = { creator, title, message, tags, selectedFile, _id: id };

    await Service.findByIdAndUpdate(id, updatedService, { new: true });

    res.json(updatedService);
}

export const deleteService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No service with id: ${id}`);

    await Service.findByIdAndRemove(id);

    res.json({ message: "Service deleted successfully." });
}

export const likeService = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No service with id: ${id}`);
    
    const service = await Service.findById(id);

    const index = service.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
        service.likes.push(req.userId);
    } else {
        service.likes = service.likes.filter((id) => id !== String(req.userId));
    }

    const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });

    res.status(200).json(updatedService);
}

export const commentService = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const service = await Service.findById(id);

    post.comments.push(value);

    const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });

    res.json(updatedService);
};

export default router;