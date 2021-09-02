import express from 'express';
import { createCategories, getCategories } from '../controllers/admin/categories.js';
import {getUsers, deleteUsers} from '../controllers/admin/users.js';
import auth from '../middleware/auth.js'
import {admin} from '../middleware/role.js'
const router = express.Router();

router.get('/users',  getUsers);
router.delete('/users/:id', deleteUsers);
router.get('/category', getCategories);
router.post('/category',createCategories);

export default router;