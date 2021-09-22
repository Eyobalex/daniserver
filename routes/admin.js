import express from 'express';
import { createCategories, deleteCategories, getCategories, editCategories } from '../controllers/admin/categories.js';
import { getListings } from '../controllers/admin/listings.js';
import {getUsers, deleteUsers, editUsers } from '../controllers/admin/users.js';
import auth from '../middleware/auth.js'
import {admin} from '../middleware/role.js'
const router = express.Router();


router.get('/users',auth, admin,  getUsers);
router.get('/category', getCategories);
router.post('/category',createCategories);
router.get('/posts', getListings);
router.patch(`/users/:id`,auth, admin,  editUsers);
router.patch('/category/:id',auth, admin,editCategories);

router.delete('/category/:id', auth, admin, deleteCategories);
router.delete('/users/:id',auth, admin, deleteUsers);

export default router;