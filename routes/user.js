const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Post = require('../models/post')
const fs = require('fs')

const removeFile = (filename) => {
  fs.unlink(`./images/resized/${filename}`, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('File Deleted successfully')
  })
}

//update
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  } else res.status(401).json('you can only update your account')
})

//delete

router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const post = await Post.find({userId:req.params.id})
      const imageArray = post.reduce((acc,cur) => [...acc,cur.photo],[])
      try {
        await Post.deleteMany({ userId: user._id })
        await User.findByIdAndDelete(req.params.id)
        removeFile(req.body.filename)
        imageArray.map(image => removeFile(image))
        res.status(200).json('User has been deleted...')
      } catch (err) {
        res.status(500).json('not available')
      }
    } catch (err) {
      res.status(404).json(err)
    }
  } else {
    res.status(401).json('You can delete only your account!')
  }
})

//Get

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...rest } = user._doc
    res.status(200).json(rest)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
