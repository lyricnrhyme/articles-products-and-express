const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const fs = require('fs');
const Articles = require('./db/articles.js');
const Products = require('./db/products.js');
const Users = require('./db/users.js');
const DS_Art = new Articles();
const DS_Prod = new Products();
const DS_User = new Users();
const PORT = process.env.PORT;


app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bp.urlencoded({ extended: true}));
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
let authorized = false;
let onlineUser;

app.get('/', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        res.render('home');
    }
})

//LOGIN FIRST
app.get('/login', (req, res) => {
    console.log('hu r u');
    res.render('login');
})

//AUTHENTICATE USER
app.post('/login', (req, res) => {
    const info = req.body;
    const user = DS_User.getUserByInfo(info.username, info.password);
    console.log('info', info);
    console.log('user', user);
    if (user === undefined) {
        console.log('Try Again')
        res.render('login')
    }
    else {
        authorized = true;
        onlineUser = user.id;
        console.log('Welcome!');
        console.log('online', onlineUser);
        res.redirect('/');
    }
})

//SETTINGS
app.get('/settings', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        res.render('settings');
    }
})

//UPDATE PASSWORD
app.get('/updatePassword', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        res.render('updatePassword');
    }
})

app.put('/updatePassword', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const user = DS_User.getUserById(onlineUser);
        const newPassword = req.body;
        console.log('yes', user)
        console.log('yes2', newPassword);
        if (newPassword.password !== newPassword.confirm) {
            console.log('They no match');
            res.redirect('/updatePassword');
        } else if (newPassword.password === newPassword.confirm) {
            user.password = newPassword.password;
            res.redirect('/settings');  
        }
    }
})

//LOGOUT
app.get('/logout', (req, res) => {
    authorized = false;
    res.redirect('/login');
})

//PRODUCTS
app.get('/products', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const products = DS_Prod.all();
        console.log('products', products);
        console.log('************');
        res.render('products', { products });
    }
})

//ADD PRODUCT
app.get('/products/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        res.render('productForm');
    }
})

app.post('/products/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const product = req.body;
        DS_Prod.add(product);
        res.redirect('/products')
    }
})

//PRODUCT DETAIL
app.get('/products/:id', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { id } = req.params;
        const product = DS_Prod.getProductById(id);
        console.log('product', product);
        console.log('************');
        res.render('productDetail', product);
    }
})

//EDIT PRODUCT
app.get('/products/:id/edit', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { id } = req.params;
        const product = DS_Prod.getProductById(id);
        res.render('updateProduct', {product});   
    }
})

app.put('/products/:id/edit', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { id } = req.params;
        const product = DS_Prod.getProductById(id);
        const newInfo = req.body;
        if (product.name !== newInfo.name) {
            product.name = newInfo.name;
        }
        if (product.price !== newInfo.price) {
            product.price = newInfo.price
        }
        if (product.inventory !== newInfo.inventory) {
            product.inventory = newInfo.inventory;
        }
        res.redirect(`/products/${id}`);  
    }
})

//DELETE PRODUCT
app.get('/products/:id/delete', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { id } = req.params;
        const product = DS_Prod.getProductById(id);
        DS_Prod.deleteProductById(product.id);
        const products = DS_Prod.all();
        res.render('products', {products} );  
    }
})

//ARTICLES
app.get('/articles', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const articles = DS_Art.all();
        console.log('articles', articles);
        console.log('************');
        res.render('articles', { articles });
    }
})

//ADD ARTICLE
app.get('/articles/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        res.render('articleForm');
    }
})

app.post('/articles/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const article = req.body;
        DS_Art.add(article);
        res.redirect('/articles')
    }
})

//ARTICLE DETAIL
app.get('/articles/:title', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        const article = DS_Art.getArticleByTitle(title);
        console.log('article', article);
        console.log('************');
        res.render('articleDetail', article);
    }
})

//EDIT ARTICLE
app.get('/articles/:title/edit', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { title } = req.params;
        console.log('rekt', req.params)
        const article = DS_Art.getArticleByTitle(title);
        console.log('yay', article);
        res.render('updateArticle', {article})        
    }
})

app.put('/articles/:title/edit', (req, res) => {
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
})

//DELETE ARTICLE
app.get('/articles/:title/delete', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`port:${PORT}`)
})