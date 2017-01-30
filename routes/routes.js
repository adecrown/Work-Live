
module.exports = function(app,passport) {



  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  /*  app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
  user : req.user // get the user out of session and pass to template
});
});
*/

/*
app.get('/students', function(req, res) {
res.render('students.ejs', { message: req.flash('kMessage') }); // load the index.ejs file
});
*/

app.get('/studg', function(req, res) {
  var User            = require('../routes/user');

  User.findOne({'teacher.username' : req.query.id}, function(err, doc) {
    //console.log("bnm ");
    if(doc)
    {
      //console.log(doc.teacher.jsondata);

      res.send(doc.teacher.jsondata);
    }
    else {
      res.render('index.ejs'); // load the index.ejs file

    }
  });

});

app.get('/students', function(req, res) {
  res.render('students.ejs');
});

/*
app.get('/students', function(req, res, username) {
var User            = require('../routes/user');

User.findOne({'teacher.username' : username}, function(err, doc) {
if(doc != null)
{
res.render('students.ejs', {
jsdata    : doc.teacher.jsondata,
message: req.flash('kMessage')

});
}
else {
res.render('index.ejs'); // load the index.ejs file

}
});

});*/



app.post('/students', passport.authenticate('data-json', {
  session: false,
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/students', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


app.get('/viewpoint', function(req, res) {
  var User            = require('../routes/user');

  User.findOne({'codeJson.idss' : req.query.id}, function(err, doc) {
    if(doc != null)
    {
      res.render('viewpoint.ejs', {
        jsdata    : doc.codeJson.jsondata,
        message: req.flash('kviewpoint')

      });
    }
    else {
      res.render('index.ejs'); // load the index.ejs file

    }
  });

});

app.post('/viewpoint', passport.authenticate('data-json', {
  session: false,
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/viewpoint', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));



app.get('/dash', isLoggedIn,function(req, res) {
  res.render('dash.ejs', {
    user : req.user // get the user out of session and pass to template
  }); // load the index.ejs file
});

app.post('/dash', passport.authenticate('teacher-data-json', {
  session: false,
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/students', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

//teachers
/*app.get('/sviewt', isLoggedIn,function(req, res) {
res.render('sviewt.ejs', {
user : req.user // get the user out of session and pass to template
}); // load the index.ejs file
});*/


app.get('/overview', isLoggedIn,function(req, res) {
  res.render('overview.ejs', {
    user : req.user // get the user out of session and pass to template
  }); // load the index.ejs file
});

app.post('/overview', passport.authenticate('teacher-data-json', {
  session: false,
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/students', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


app.get('/sviewt', isLoggedIn,function(req, res) {
  var User            = require('../routes/user');
  User.findOne({'codeJson.idss' : req.query.room}, function(err, doc) {
    if(doc != null)
    {
      res.render('sviewt.ejs', {
        jsdata    : doc.codeJson.jsondata,
        user : req.user
      });
    }
    else {
      res.render('index.ejs'); // load the index.ejs file

    }
  });

});





///student
/*app.get('/sview', function(req, res) {
res.render('sview.ejs', {
user : req.user // get the user out of session and pass to template
}); // load the index.ejs file); // load the index.ejs file
});

*/

app.get('/sviewStudent', function(req, res) {
  var User            = require('../routes/user');
  User.findOne({'codeJson.idss' : req.query.id}, function(err, doc) {
    if(doc != null)
    {
      res.send(doc.codeJson.jsondata)
    }
  });
});


app.get('/sview', function(req, res) {

      res.render('sview.ejs');
});


app.get('/live', function(req, res) {
  var User            = require('../routes/user');
  User.findOne({'codeJson.idss' : req.query.id}, function(err, doc) {
    if(doc != null)
    {
      res.render('live.ejs', {
        jsdata    : doc.codeJson.jsondata
      });
    }
    else {
      res.render('index.ejs'); // load the index.ejs file

    }
  });
});

app.get('/login', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('login.ejs', { message: req.flash('loginMessage') });
});




app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/dash', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));



app.get('/signup', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/dash', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

};





function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  {
    return next();
  }
  else
  {

    // if they aren't redirect them to the home page
    res.redirect('/');


  }
}
