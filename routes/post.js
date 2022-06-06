const router = require('express').Router()
const Post = require('../models/post')
const fs = require('fs')

const removeFile = (filename) => {
   fs.unlink(`./images/resized/${filename}`,(err) => {
    if(err) {
      console.log(err)
    }
    console.log('File Deleted successfully')
  })
}


//create Post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const post = await newPost.save()
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

//update Post
router.put('/:id', async (req, res) => {
  if (req.body.id === req.params.id) {
    const post = await Post.findById({ _id: req.body.id })
    if ((post.userId).toString() === req.body.userId) {
      try {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: req.body.id },
          { $set: req.body },
          { new: true }
        )
        res.status(200).json(updatedPost)
      } catch (err) {
        res.status(500).json(err)
      }
    } else res.status(401).json('wrong credentials')
  }
})

//deletePost
router.delete('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post.username === req.body.username) {
    try {
      await post.delete()
      removeFile(req.body.filename)
      res.status(200).json('successfully deleted Post')
    } catch (err) {
      res.status(500).json(err)
    }
  } else res.status(401).json('wrong credentials')
})

//Get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id })
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

//Get all post

router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.category
  const date = req.query.sortby
  const filter = req.query.filterby
  let posts
  try {
    if (username) {
      posts = await Post.find({ username })
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      })
    } else if (date) {
      posts = await Post.find().sort({ createdAt: date })
    } else if (filter) {
      posts = await Post.aggregate([
        {
          $addFields: { likes_count: { $size: '$likes' } },
        },
        {
          $sort: { likes_count: parseInt(filter) },
        },
      ])
    } else posts = await Post.find()

    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
})
// like/dislike post

router.put('/', async (req, res) => {
  const userId = req.body.userId
  try {
    const [post] = await Post.find({ _id: req.body.id })
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } })
      res.status(200).json('disliked')
    } else {
      await post.updateOne({ $pull: { likes: userId } })
      res.status(200).json('liked')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
// get all comments

router.get('/:id/comments', async (req,res) => {
  try{
    const [post] = await Post.find({_id:req.params.id})
    res.status(200).json(post.comments.reverse())
  }
  catch(err){
    res.status(500).json(err)
  }
})
// comment/uncomment Post

router.post('/:id/comments', async (req, res) => {
  try {
    const [post] = await Post.find({ _id: req.params.id })
    await post.updateOne({
      $push: {
        comments: req.body,
      },
    })
    res.status(200).json('successfully commented')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id/comments',async (req,res) => {
  try{
    const [post] = await Post.find({ _id: req.params.id })
    await post.updateOne({
      $pull: {
        comments: req.body,
      },
    })
    res.status(200).json('successfully deleted comment')
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router
