const express = require('express');
const Router = express.Router();
const Article = require('../db/articles.js');
const DS_Art = new Article();

Router.get('/articles', (req, res) => {
    const articles = DS_Art.all();
    console.log('articles', articles);
    console.log("*********");
    res.render('articles', { articles });
})

Router.get('/articles/new', (req, res) => {
    res.render('articleForm');
});

Router.post('/articles/new', (req, res) => {
    const article = req.body;
    DS_Art.add(article);
    res.redirect('/articles');
});

Router.get('/articles/:title', (req, res) => {
    const { title } = req.params;
    const article = DS_Art.getArticleByTitle(title);
    console.log('article', article);
    console.log('************');
    res.render('articleDetail', article);
});

Router.get('/articles/:title/edit', (req, res) => {
    const { title } = req.params;
    console.log('rekt', req.params);
    const article = DS_Art.getArticleByTitle(title);
    console.log('yay', article);
    res.render('updateArticle', { article });
});

Router.put('/articles/:title/edit', (req, res) => {
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
    res.redirect(`/articles/${title}`)
});

Router.get('/articles/:title/delete', (req, res) => {
    const { title } = req.params;
    console.log('test3', title);
    const article = DS_Art.getArticleByTitle(title);
    console.log('hello?' )
    DS_Art.deleteArticleByTitle(article.title);
    const articles = DS_Art.all();
    res.render('articles', {articles} );
})