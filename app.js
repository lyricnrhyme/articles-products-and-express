const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const Articles = require('./db/articles.js');
const Products = require('./db/products.js');
const DS_Art = new Articles();
const DS_Prod = new Products();
const PORT = process.env.PORT;


app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bp.urlencoded({ extended: true}));
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('home');
})

//PRODUCTS
app.get('/products', (req, res) => {
    const products = DS_Prod.all();
    console.log('products', products);
    console.log('************');
    res.render('products', { products });
})

//ADD PRODUCT
app.get('/products/new', (req, res) => {
    res.render('productForm');
})

app.post('/products/new', (req, res) => {
    const product = req.body;
    DS_Prod.add(product);
    res.redirect('/products')
})

//PRODUCT DETAIL
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = DS_Prod.getProductById(id);
    console.log('product', product);
    console.log('************');
    res.render('productDetail', product);
})

//EDIT PRODUCT
app.get('/products/:id/edit', (req, res) => {
    const { id } = req.params;
    const product = DS_Prod.getProductById(id);
    res.render('updateProduct', product);
})

app.post('/products/:id/edit', (req, res) => {
    const { id } = req.params;
    const product = DS_Prod.getProductById(id);
    res.redirect('/products', product);
})

//ARTICLES
app.get('/articles', (req, res) => {
    const articles = DS_Art.all();
    console.log('articles', articles);
    console.log('************');
    res.render('articles', { articles });
})

//ADD ARTICLE
app.get('/articles/new', (req, res) => {
    res.render('articleForm');
})

app.post('/articles/new', (req, res) => {
    const article = req.body;
    DS_Art.add(article);
    res.redirect('/articles')
})

//ARTICLE DETAIL
app.get('/articles/:title', (req, res) => {
    const { title } = req.params;
    const article = DS_Art.getArticleByTitle(title);
    console.log('article', article);
    console.log('************');
    res.render('articleDetail', article);
})

//EDIT ARTICLE
app.get('/articles/:title/edit', (req, res) => {
    const { title } = req.params;
    const article = DS_Art.getArticleByTitle(title);
    res.render('updateArticle', article);
})

app.put('/articles/:title/edit', (req, res) => {
    const { title } = req.params;
    const article = DS_Art.getArticleByTitle(title);
    res.redirect('/articles');
})

app.listen(PORT, () => {
    console.log(`port:${PORT}`)
})