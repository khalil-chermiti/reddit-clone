import express from 'express'
const postsRouter = express.Router();


import {updatePost , deletePost , getAllPosts,createPost} from '../controllers/postsController.js'
postsRouter.route('/').get(getAllPosts)
 .post(createPost);
 postsRouter.route('/:id').patch(updatePost)
.delete(deletePost)

export default postsRouter;