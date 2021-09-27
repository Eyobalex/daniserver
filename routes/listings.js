import express from "express";

import {
  getPosts,
  getPostsBySearch,
  uploadProductImage,
  getOwnPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  postsByCategory,
  rateAListing,
  removeProductImage,
} from "../controllers/listings.js";

import auth from "../middleware/auth.js";
import { business, client } from "../middleware/role.js";
import imageUpload from "../middleware/upload.js";
const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/own",auth, getOwnPosts);
router.get("/category", postsByCategory);
router.patch("/productImage/:id", imageUpload.single('productImage'), uploadProductImage);
router.delete('/productImage/:productId', removeProductImage);
router.get("/:id", getPost);

router.post("/", auth, business, createPost);
router.patch("/:id", auth, business,  updatePost);
router.delete("/:id", auth, business, deletePost);
router.patch("/:id/likePost", auth, client,  likePost);

router.patch("/rate/:id", rateAListing);

export default router;
