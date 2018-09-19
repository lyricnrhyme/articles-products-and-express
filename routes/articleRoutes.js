const express = require('express');
const Router = express.Router();
const Article = require('../db/articles.js');
let authorized = require('../app.js');
const DS_Art = new Article();
const knex = require('../knex/knex.js');

Router.get('/articles', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        DS_Art.all()
        .then( results => {
            const articles = results.rows
            console.log('hi', articles);
            res.render('articles', { articles });
        })
        .catch( err => {
            console.log('error', err);
        })
    }
})

//DO DIS
Router.get('/articles/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        res.render('articleForm');
    }
});

//DO DIS
Router.post('/articles/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const article = req.body;
        DS_Art.add(article);
        res.redirect('/articles')
    }
});

//DO DIS
Router.get('/articles/:title', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        const article = DS_Art.getArticleByTitle(title);
        console.log('article', article);
        console.log('************');
        res.render('articleDetail', article);
    }
});

//DO DIS
Router.get('/articles/:title/edit', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        console.log('rekt', req.params)
        const article = DS_Art.getArticleByTitle(title);
        console.log('yay', article);
        res.render('updateArticle', {article})        
    }
});

//DO DIS
Router.put('/articles/:title/edit', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        const article = DS_Art.getArticleByTitle(title);
        const newInfo = req.body;
        if (article.title !== newInfo.title) {
            article.title = newInfo.title;
        }
        if (article.author !== newInfo.author) {
            article.author = newInfo.author
        }
        if (article.description !== newInfo.description) {
            article.description = newInfo.description;
        }
        res.redirect(`/articles/${title}`);        
    }
});

//DO DIS
Router.get('/articles/:title/delete', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        console.log('test3', title);
        const article = DS_Art.getArticleByTitle(title);
        console.log('hello?' )
        DS_Art.deleteArticleByTitle(article.title);
        const articles = DS_Art.all();
        res.render('articles', {articles} );
    }
})

module.exports = Router;