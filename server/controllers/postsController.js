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
        const {title,community} = req.body;
        res.status(StatusCodes.CREATED).json({post});
        if(!title || !community){
            throw new BadRequestError("please provide all required fields")
        }
    } catch (error) {
        //throw new BadRequestError("couldn't create post :(");
        console.log(error)
    }
}
const updatePost = async (req,res)=>{ 
    const {id : postId} = req.params ;
    const {type} = req.body ;

    switch(type) {
        case "upvote" : {
            const {userName ,id} = req.body;
            const hasVoted = await upVote(userName,id);

            return hasVoted ? res.status(StatusCodes.OK).json({"hasVoted":true}) :
                res.status(StatusCodes.OK).json({"hasVoted":false});
        }
        case "downvote" : {
            const {userName ,id} = req.body;
            const hasVoted = await downVote(userName,id);

            return hasVoted ? res.status(StatusCodes.OK).json({"hasVoted":true}) :
                res.status(StatusCodes.OK).json({"hasVoted":false});
        }
        case "update" : {
            const post = await Posts.findOne({"_id":postId});
            if(!post){
                throw new BadRequestError(`No such post with id ${postId}`);
            } 
            checkPermissions(req.user,post.createdBy);
            const updatedPost = await Posts.findOneAndUpdate({ _id: postId }, req.body, {
                new: true,
                runValidators: true,
              })
             
              res.status(StatusCodes.OK).json({ updatedPost })
        }
        default : return res.status(StatusCodes.BAD_REQUEST)
    }

}
const deletePost = async (req, res) => {
    const { id: postId } = req.params ;
    const post = await Posts.findOne({ _id: postId })
  
    if (!post) {
      throw new NotFoundError(`No post with id :${postId}`)
    }
  
    checkPermissions(req.user, post.createdBy)
  
    await Posts.remove()
  
    res.status(StatusCodes.OK).json({ msg: 'Success! Post removed' })
  }

  const upVote = async (userName,postId) => {
    const post = await Posts.findOne({"_id" :postId , "voters" : {"$elemMatch" : {"$eq":userName}} });
    console.log(post);
    if(post || userName === "anonymous"){
        return true
    }else{
        await Posts.updateOne({"_id":postId},{"$inc":{"upvotes":1},"$push":{"voters":userName}});
        return false
    }
  }

  const downVote = async (userName,postId) => {
      console.log(userName)
    const post = await Posts.findOne({"_id" :postId , "voters" : {"$elemMatch" : {"$eq":userName}} });
    console.log(post);
    if(post || userName === "anonymous"){
        return true
    }else{
        await Posts.updateOne({"_id":postId},{"$inc":{"downvotes":1},"$push":{"voters":userName}});
        return false
    }
  }



export {getAllPosts,
        createPost,
        updatePost,
        deletePost
    }