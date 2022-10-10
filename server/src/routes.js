const UserController = require('./controllers/UserController.js');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController')
const BlogController = require('./controllers/BlogController');
const ProductController = require('./controllers/ProductController');
const RecomController = require('./controllers/RecomController');
const Blog = require('./models/Blog.js');
const Recom = require('./models/Recom.js');
const Product = require('./models/Product.js');


let multer = require("multer")

// upload section
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now());
        console.log(file);
        callback(null, file.originalname);
    }
})
let upload = multer({ storage: storage }).array("userPhoto", 10)


module.exports = (app) => {
    app.post('/user', UserController.create)
    app.put('/user/:userId', UserController.put)
    app.delete('/user/:userId', UserController.remove)
    app.get('/user/:userId', UserController.show)

    app.get('/users', isAuthenController, UserController.index)

    app.post('/login', UserAuthenController.login)

    app.post('/blog', BlogController.create)
    app.put('/blog/:blogId', BlogController.put)
    app.delete('/blog/:blogId', BlogController.remove)
    app.get('/blog/:blogId', BlogController.show)
    app.get('/blogs', BlogController.index)

    app.post('/product', ProductController.create)
    app.put('/product/:productId', ProductController.put)
    app.delete('/product/:productId', ProductController.remove)
    app.get('/product/:productId', ProductController.show)
    app.get('/product', ProductController.index)

    app.post('/recom', RecomController.create)
    app.put('/recom/:recomId', RecomController.put)
    app.delete('/recom/:recomId', RecomController.remove)
    app.get('/recom/:recomId', RecomController.show)
    app.get('/recom', RecomController.index)

    app.put('/reco/:recoId', RecoController.put)

    app.post('/upload', function (req, res) {
        upload(req, res, function (err) {
            // isUserAuthenicated,
            if (err) {
                return res.end("Error uploading file.")
            }
            res.end("File is uploaded")
        })
    })
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs');
            console.log(req.body.filename)
            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename,
                (err) => {
                    if (err) throw err;
                    res.send("Delete sucessful")
                    // console.log('successfully deleted material file');
                });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete file the material'
            })
        }

    })
}