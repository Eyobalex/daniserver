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
  rateAListing,
} from "../controllers/listings.js";

import auth from "../middleware/auth.js";
import imageUpload from "../middleware/upload.js";
const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/own",auth, getOwnPosts);
router.patch("/productImage/:id", imageUpload.single('productImage'), uploadProductImage);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

router.patch("/rate/:id", rateAListing);

export default router;
