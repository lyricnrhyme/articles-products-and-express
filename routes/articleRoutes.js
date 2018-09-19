const express = require('express');
const Router = express.Router();
const Article = require('../db/articles.js');
let authorized = require('../app.js');
const DS_Art = new Article();
const knex = require('../knex/knex.js');

Router.get('/articles', (req, res) => {
    if (!authorized) {
        res.redirect('/login')
        .catch( err => {
            console.log('err', err);
        })
    } else {
        DS_Art.all()
        .then( results => {
            const articles = results.rows
            res.render('articles', { articles });
        })
        .catch( err => {
            console.log('err', err);
        })
    }
})

Router.get('/articles/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        res.render('articleForm');
    }
});

Router.post('/articles/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const article = req.body;
        DS_Art.add(article)
        .then( results => {
            res.redirect('/articles')
        })
        .catch( err => {
            console.log('err', err);
        })
    }
});

Router.get('/articles/:title', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        DS_Art.getArticleByTitle(title)
        .then( results => {
            const article = results.rows[0];
            res.render('articleDetail', article);
        })
        .catch( err => {
            console.log('err', err);
        })
    }
});

Router.get('/articles/:title/edit', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        DS_Art.getArticleByTitle(title)
        .then( results => {
            const article = results.rows[0];
            res.render('updateArticle', {article});
        })     
        .catch( err => {
            console.log('err', err);
        })  
    }
});

Router.put('/articles/:title/edit', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        const newInfo = req.body;
        DS_Art.updateArticleById(newInfo, title)
        .then( results => {
            const article = results.rows[0];
            res.redirect(`/articles/${title}`)
        }) 
        .catch( err => {
            console.log('err', err);
        })    
    }
});

Router.get('/articles/:title/delete', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        DS_Art.deleteArticleByTitle(title)
        .then( results => {
            DS_Art.all()
            .then( results => {
                const articles = results.rows;
                res.render('articles', {articles});
            })
            .catch( err => {
                console.log('err', err);
            })
        })
    }
})

module.exports = Router;