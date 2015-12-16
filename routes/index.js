var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './image-uploads'}).single('userPhoto');

// Base home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS Editor' });
});

// Image upload test code
router.get('/image', function(req, res, next){
   res.render('image', { title: 'Image Upload'});
});

//======================= IMAGE WORK START
// Create image file
router.post('/sendImage', function(req, res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
//======================== IMAGE WORK END


module.exports = router;
