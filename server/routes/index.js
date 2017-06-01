var path = process.cwd() + '/server'
var BookUser = require('../models/bookUser')
var Book = require('../models/book')
var request = require('request')
var mongoose = require('mongoose')
var moment = require('moment')
var bookshelf = require('../models/bookShelf')
bookshelf.initialize()

module.exports = function(app, passport){

  app.route('/login')
    .post( function(req, res, next){
      console.log('login route')
      passport.authenticate('local-login', function(err, user, info){
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.json({success:false, reason:info.code, msg: info.msg});
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json({success: true, user: req.session.passport.user});
        });
      })(req, res, next);
    })

    app.route('/signup')
      .post( function(req, res, next){
        console.log('signup route')
        passport.authenticate('local-signup', function(err, user, info){
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.json({success:false, reason:info.code, msg: info.msg});
          }
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            bookshelf.addUser()
            return res.json({success: true, user: req.session.passport.user});
          });
        })(req, res, next);
      })

    //log out of passport, destroy session, return to index
    app.get('/logout', function(req,res){
      req.logout()
      req.session.destroy(function (err) {
          res.status(200).send(); //Inside a callback… bulletproof!
      })
    })

    app.route('/stats')
      .get(function(req,res){
        var data = bookshelf.getData()
        res.json({users: data.totalUsers, books: data.totalBooks, borrows: data.totalBorrows})
      })

    app.route('/coversearch')
      .post( function(req, res){
        baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='
        qry=req.body.title + '+inauthor:' + req.body.author + '&key=' + process.env.GOOGLE_BOOKS_KEY
        request.get(baseUrl+qry).pipe(res)
      })

    app.route('/addbook')
      .post( function(req, res){

        var newBook = new Book(req.body)
        newBook.save(function(err,done){
          if(err){
            console.log(err)
            res.json({error: "error saving book"})
          } else {
            bookshelf.addBook(done)
            var data = bookshelf.getData()
            res.send({all: data.allBooks, popular: data.popularBooks})
          }

        })
      })

    app.route('/getbooks')
      .post(function(req,res){
        Book.find({ $or: [{owner: req.body.username}, {borrowedBy: req.body.username}] }, function(err, books){
          if(err){ console.log(err)}
          res.json(books)
        })
      })

    app.route('/allbooks')
      .get(function(req,res){
        var data = bookshelf.getData()
        res.json({all: data.allBooks, popular: data.popularBooks})
      })

    app.route('/borrow')
      .post(function(req, res){
        Book.findOne( {_id: mongoose.Types.ObjectId(req.body.bookId)}, function(err, book){
          if(err){
            console.log(err)
            return res.json({success: false})
          }
          if(book.available){
            book.available = false
            book.borrows++
            book.borrowedBy = req.body.user
            book.dueDate = moment().add(5, 'days')
            book.save( function(err, result){
              Promise.all( [bookshelf.getAllBooks(), bookshelf.getPopularBooks()])
                .then(results=>{
                  res.json({success: true, books: {all:results[0], popular: results[1]}})
                })
                .catch(error=>{
                  console.log(error)
                })
            })
          } else {

            return res.json({success: false})
          }
        })
      })

    app.route('/return')
      .post(function(req,res){
        Book.findOne({_id: mongoose.Types.ObjectId(req.body.bookId)}, function(err, book){
          if(err){
            console.log(err)
            return res.json({success: false})
          }

          book.available = true
          book.borrowedBy = ""
          book.dueDate = null
          book.save( function(err, result){
            Promise.all( [bookshelf.getAllBooks(), bookshelf.getPopularBooks()])
              .then(results=>{
                res.json({success: true, books: {all:results[0], popular: results[1]}})
              })
          })
        })
      })
}
