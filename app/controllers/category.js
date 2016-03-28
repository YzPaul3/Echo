var Category = require('../models/category');



//admin page
exports.new = function (req, res) {
    res.render('category_admin', {
        title: 'Page 后台分类录入页',
        category: {}
    });

}


//admin post movie
exports.save = function (req, res) {
    var _category = req.body.category;
    var category = new Category(_category);

    category.save(function(err, category){
        if (err) {
            console.log(err);
        }
        res.redirect('/admin/category/list/');
    })
}


//list page
exports.list = function (req, res) {
    Category.fetch(function (err, categories) {
        if (err) {
            console.log(err);
        }

        res.render('categorylist', {
            title: 'Page 分类列表页',
            categories: categories
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