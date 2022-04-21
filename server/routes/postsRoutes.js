import express from 'express'
const postsRouter = express.Router();


import {getAllPosts,createPost} from '../controllers/postsController.js'
postsRouter.route('/post').get(getAllPosts)
 .post(createPost);
 postsRouter.route('/post/:id').patch(updatePost)
.delete(deletePost)

export default postsRouter;