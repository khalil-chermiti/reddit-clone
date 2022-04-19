import express from 'express'
const postsRouter = express.Router();


import {getAllPosts} from '../controllers/postsController.js'
postsRouter.route('/post').get(getAllPosts)
// .post(createPost).patch(updatePost)
// .delete(deletePost)

export default postsRouter;