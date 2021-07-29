import express from 'express';

import { getItems, getItemsBySearch, getItemsByCreator, getItem, createItem, updateItem, likeItem, commentItem, deleteItem } from '../controllers/items.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getItemsByCreator);
router.get('/search', getItemsBySearch);
router.get('/', getItems);
router.get('/:id', getItem);

router.post('/', auth,  createItem);
router.patch('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);
router.patch('/:id/likeItem', auth, likeItem);
router.post('/:id/commentItem', commentItem);

export default router;