import { createComment, deleteComment, editComment} from "../controllers/commentController.js";
import express from 'express';

const router = express.Router();
    
router.post('/:postId', createComment);
router.patch('/:id', editComment);
router.delete('/:id/:postId', deleteComment);

export default router;