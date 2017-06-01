var BookUser = require('./bookUser')
var Book = require('./book')
var bookShelf = function(){

  var data = {
    totalUsers: 0,
    totalBooks: 0,
    totalBorrows: 0,
    allBooks: [],
    popularBooks: []
  }

  function getData(){
    return data
  }

  function addUser(){
    data.totalUsers++
  }

  function addBook(book){
    data.totalBooks++
    data.allBooks.push(book)
  }

  function addBorrow(){
    data.totalBorrows++
  }

  function setBooks(books){
    data.allBooks = books
  }

  function setPopularBooks(books){
    data.popularBooks = books
  }

  function setTotalUsers(users){
    data.totalUsers = users
  }

  function setTotalBooks(books){
    data.totalBooks = books
  }

  function setTotalBorrows(borrows){
    data.totalBorrows = borrows
  }

  function getAllBooks(){
    return new Promise( function(resolve, reject){
      Book.find({}, function(err, result){
        if(err){ reject(err)}
        else{
          resolve(result)
        }
      })
    })
  }

  function getPopularBooks(){
    return new Promise( function(resolve, reject){
      Book.find({})
          .limit(12)
          .sort({ borrows: -1 })
          .select({ _id: 1, coverImage: 1, available: 1, owner: 1, dueDate: 1 })
          .exec(function(err, result){
            if(err){ reject(err) }
            resolve(result)
          });
    })
  }

  function initialize(){
    var p1 = function(){
      return new Promise( function(resolve, reject){
        BookUser.count({}, function(err, count){
          if(err){
            reject(err)
          } else {
            resolve(count)
          }
        })
      })
    }
    var p2 = function(){
      return new Promise( function(resolve, reject){
        Book.count({}, function(err, count){
          if(err){
            reject(err)
          } else {
            resolve(count)
          }
        })
      })
    }
    var p3 = function(){
      return new Promise( function(resolve, reject){
        var sum = Book.aggregate(
            { $group: {
                _id: null,
                total: { $sum: "$borrows" }
            }},
            function(err, response){
              if(err){reject(err)}
              else(resolve(response))
            }
        )
      })
    }

    Promise.all([p1(), p2(), p3(), getAllBooks(), getPopularBooks()])
      .then( results=>{
        setTotalUsers(results[0])
        setTotalBooks(results[1])
        setTotalBorrows(results[2][0].total)
        setBooks(results[3])
        setPopularBooks(results[4])
        console.log('initialized')
      })
      .catch(error=>{
        console.log(error)
      })
  }

  return ({
    getData: getData,
    addUser: addUser,
    addBook: addBook,
    addBorrow: addBorrow,
    setBooks: setBooks,
    setPopularBooks: setPopularBooks,
    getAllBooks: getAllBooks,
    getPopularBooks: getPopularBooks,
    initialize: initialize
  })
}()

module.exports = bookShelf
