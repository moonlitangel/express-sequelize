var models  = require('../models');
var express = require('express');
var router  = express.Router();
var multer = require('multer');
var fs = require('fs');

router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users
    });
  });
});

//search in fileUpload & response
router.get('/imgs/:name', function(request, response) {
    var name = request.params.name;
    fs.readFile('fileupload/' + name, function(error, data) {
        if (error) {
            console.log('error here');
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
            response.end();
        } else {
            response.writeHead(200, {
                'Content-Type': 'images/jpg'
            });
            response.end(data);
        }
    });
    // fs.stat(?,isFile)
    // path.exist(?, [callback], [name]);
});

var upload = multer({
    dest: 'upload/'
});
var type = upload.single('file')

// var upload = multer({storage: storage}).array('photo', 5);

// //fileUpload
router.post('/upload', type, function(request, response) {

    /** When using the "single"
         data come in "req.file" regardless of the attribute "name". **/
    var tmp_path = request.file.path;

    /** The original name of the uploaded file
        stored in the variable "originalname". **/
    var filename = Math.round(+new Date() / 1000) + '_' + request.file.originalname;
    var target_path = './fileupload/' + filename;

    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        console.log(request.files);

        response.end(filename);
        console.log('Photo Uploaded');
    });

    src.on('error', function(err) {
        return response.end(err.toString());
    });

    // upload(request, response, function(err) {
    //     if(err) {
    //       console.log(err.toString());
    //       return response.end(err.toString());
    //     }
    //     // request.files is an object where fieldname is the key and value is the array of files
    //     console.log(request.files);
    //     response.end('Your Files Uploaded');
    //     console.log('Photo Uploaded');
    //   });

    console.log(request.body);
    console.log(request.file);
    // res.status(204).end();

});

module.exports = router;
