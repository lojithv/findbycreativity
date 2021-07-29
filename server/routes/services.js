import express from 'express';

import { getServices, getServicesBySearch, getServicesByCreator, getService, createService, updateService, likeService, commentService, deleteService } from '../controllers/services.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getServicesByCreator);
router.get('/search', getServicesBySearch);
router.get('/', getServices);
router.get('/:id', getService);

router.post('/', auth,  createService);
router.patch('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);
router.patch('/:id/likeService', auth, likeService);
router.post('/:id/commentService', commentService);

export default router;