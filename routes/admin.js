import express from 'express';
import { createCategories, getCategories } from '../controllers/admin/categories.js';
import {getUsers} from '../controllers/admin/users.js';
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'
const router = express.Router();

router.get('/users',auth,role,  getUsers);
router.get('/category',auth,role, getCategories);
router.post('/category',auth,role, createCategories);

export default router;