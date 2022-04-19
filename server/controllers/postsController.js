import Posts from '../models/postsModel.js'
const getAllPosts = async(req,res)=>{
    const posts = await Posts.find({});
    res.status(200).json(posts);
}

export {getAllPosts}