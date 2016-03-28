var Movie = require('../models/movie');
var Category = require('../models/category');
var User = require('../models/user');
var _ = require('underscore');

//detail page
exports.detail = function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: movie.title,
            movie: movie
        });
    })
}

//admin new page
exports.new = function (req, res) {
    Category.find({}, function(err, categories){
        res.render('admin', {
            title: 'Page 后台录入页',
            categories: categories,
            movie: {}
        });
    })
}

//admin update movie
exports.update = function (req, res) {
    var id = req.params.id;

    if (id) {
        Category.find({}, function(err, categories){
            Movie.findById(id, function (err, movie) {
                res.render('admin', {
                    title: 'Page 后台更新页',
                    movie: movie,
                    categories: categories
                })
            })
        })
    }
}

//admin post movie
exports.save = function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if (id) {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }

            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    }
    else {
        _movie = new Movie(movieObj);
        //console.log(movieObj);
        var categoryId = _movie.category;
        var categoryName = movieObj.categoryName;

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            if(categoryId){
                Category.findById(categoryId, function(err, category){
                    category.movies.push(movie._id);
                    category.save(function(err, category){
                        res.redirect('/movie/' + movie._id)
                    })
                })
            }else if (categoryName){
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                })
                category.save(function(err, category){
                    movie.category = category._id;
                    movie.save(function(err, movie){
                        res.redirect('/movie/' + movie._id);
                    })
                })
            }

        })
    }
}


//list page
exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('list', {
            title: 'Page 列表页',
            movies: movies
        });
    })

}

//list delete movie
exports.del = function (req, res) {
    console.log(req.query);
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err)
            }
            else {
                res.json({success: 1})
            }
        })
    }
}