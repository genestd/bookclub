var passport = require('passport')
var BookUser = require('../models/bookUser')
var LocalStrategy = require('passport-local').Strategy

module.exports = function(passport){
  passport.serializeUser(function(bookUser,done){
    done(null, bookUser)
  })

passport.deserializeUser( function(userProfile, done){
  BookUser.findById(userProfile._id, function(err, user){
    done(err, user)
  })
})

passport.use( 'local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // pass back the entire request to the callback
  },
  function(req, username, password, done) {
    console.log('in local signup', username, password, req.body)
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

    // find a user whose email is the same as the form's email
    // we are checking to see if the user trying to login already exists
    BookUser.findOne({ email:  username }, function(err, user) {
      // if there are any errors, return the error
      if (err){
          return done(err);
      }
      // check to see if theres already a user with that email
      if (user) {
          return done(null, false, {code: 0, msg: { header: "Duplicate email",
                                                    body: 'That email is already registered'
                                                  }
                                   }
                     )
      } else {
          console.log('email ok, checking screenname')
          //now check to see if there's already a user with that screen name
          BookUser.findOne({ username:  req.body.screenname }, function(err, user){
            // if there is no user with that screenname
            // create the user
            if(err){ return done(err) }
            if(user){
              return done(null, false, {code: 1, msg: { header: "Duplicate screen name",
                                                        body: 'That screen name is already registered'
                                                      }
                                       }
                         )
            } else {
                var newUser = new BookUser();

                // set the user's local credentials
                newUser.username = req.body.screenname
                newUser.email = username;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err){
                      console.log(err)
                      throw err
                    }
                    return done(null, newUser);
                });
            }
          })
        }
      });
    });
  })
)

passport.use( 'local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // pass back the entire request to the callback
  },
  function(req, username, password, done) {
    console.log('in local login')
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    BookUser.findOne({ email :  username }, function(err, user) {
        // if there are any errors, return the error
        if (err){
          return done(err);
        }
        // check to see if theres already a user with that email
        if (!user) {
          return done(null, false, {success: false, code:1, msg: { header: "Email not found",
                                                                    body: 'Please try again, or Sign Up'
                                                                  }
                                    }
                      )
        }

        if( !user.validPassword(password)){
          return done(null, false, {success: false, code:2, msg: { header: 'Invalid password!',
                                                                    body: 'Please re-enter password'
                                                                  }
                                   }
                     )
        }

        return done(null, user)
      })
    })
  })
)
}
