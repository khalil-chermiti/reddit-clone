import StatusCodes from 'http-status-codes';
import Posts from '../models/postsModel.js'
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';

const getAllPosts = async(req,res)=>{
    try {
        const posts = await Posts.find({});
        res.status(StatusCodes.OK).json(posts);
        
    } catch (error) {
        throw new BadRequestError('cannot get posts :(');
    }
}
const createPost = async(req,res)=>{
    try {
        const post = await Posts.create(req.body);
        res.status(StatusCodes.CREATED).json({post});
        if(!title || !community){
            throw new BadRequestError("please provide all required fields")
        }
    } catch (error) {
        throw new BadRequestError("couldn't create post :(");

    }
}
const updatePost = async (req,res)=>{
    const { id:postId } = req.params;

    const post = await Posts.findOne({"_id":postId});
    if(!post){
        throw new BadRequestError(`No such post with id ${postId}`);
    }
    checkPermissions(req.user,post.createdBy);
    const updatedPost = await Job.findOneAndUpdate({ _id: postId }, req.body, {
        new: true,
        runValidators: true,
      })
    
      res.status(StatusCodes.OK).json({ updatedPost })

}
const deletePost = async (req, res) => {
    const { id: postId } = req.params
  
    const post = await Posts.findOne({ _id: postId })
  
    if (!post) {
      throw new NotFoundError(`No post with id :${postId}`)
    }
  
    checkPermissions(req.user, post.createdBy)
  
    await Posts.remove()
  
    res.status(StatusCodes.OK).json({ msg: 'Success! Post removed' })
  }

export {getAllPosts,
        createPost,
        updatePost,
        deletePost
    }