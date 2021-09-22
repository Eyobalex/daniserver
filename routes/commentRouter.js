import { createComment, deleteComment, editComment} from "../controllers/commentController.js";
import express from 'express';
import { business, client } from "../middleware/role.js";
import auth from "../middleware/auth.js";

const router = express.Router();
    
router.post('/:postId',auth, client, createComment);
router.patch('/:id',auth, client, editComment);
router.delete('/:id/:postId',auth, client,  deleteComment);

export default router;