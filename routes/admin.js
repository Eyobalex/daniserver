import express from 'express';
import { createCategories, deleteCategories, getCategories } from '../controllers/admin/categories.js';
import {getUsers, deleteUsers} from '../controllers/admin/users.js';
import auth from '../middleware/auth.js'
import {admin} from '../middleware/role.js'
const router = express.Router();

router.get('/users',  getUsers);
router.get('/category', getCategories);
router.post('/category',createCategories);

router.delete('/category/:id',deleteCategories);
router.delete('/users/:id', deleteUsers);
export default router;