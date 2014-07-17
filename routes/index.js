/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Mi primera app con Node.js y Express.js' });
};

/* GET helloworld page. */
exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'HelloWorld' });
};

/* GET Userlist page. */
exports.userlist = function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
};


/* Get new user*/
exports.newuser = function(req, res) {
   res.render('newuser', { title: 'Agrega un Usuario' });
};


/* POST to Add User Service */
exports.adduser = function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
};