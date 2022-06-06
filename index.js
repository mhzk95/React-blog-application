const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const multer = require('multer')
const sharp = require('sharp')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const categoryRoute = require('./routes/category')


dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/images',express.static(path.join(__dirname,'/images')))


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to database')
}).catch((err) => {console.log(err)});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.name)
    }
  })
  
  const upload = multer({ storage: storage })

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ,
    api_key: process.env.APP_KEY ,
    api_secret: process.env.APP_SECRET ,
  });

app.post('/api/upload',upload.single('file'),async (req,res) => {
    const { filename: image } = req.file;

    await sharp(req.file.path)
     .resize(640,480)
     .jpeg({ quality: 85 })
     .toFile(
         path.resolve(req.file.destination,'resized',image)
     )
     
     cloudinary.uploader.upload(`images/resized/${image}`,(error, result) => {
      // console.log(result, error)
      fs.unlinkSync(req.file.path)
      res.status(200).json(result.url)
    });
     
     
    
})

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/category',categoryRoute)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 5000,() => {
    console.log('api listening to port')
})