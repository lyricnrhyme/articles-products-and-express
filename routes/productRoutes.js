const express = require('express');
const Router = express.Router();
const Product = require('../db/products.js');
let authorized = require('../app.js');
const DS_Prod = new Product();
const knex = require('../knex/knex.js')

Router.get('/products', (req, res) => {
    if (!authorized) {
        res.redirect('/login')
        .catch( err => {
            console.log('error', err);
        })
    } else {
        DS_Prod.knex.raw('SELECT * FROM products')
        .then( results => {
            const products = results.rows
            res.render('products', { products });
        })
        .catch( err => {
            console.log('error', err);
        })
    }
});

Router.get('/products/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        res.render('productForm')
    }
})

Router.post('/products/new', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const product = req.body;
        // console.log('added', product)
        DS_Prod.add(product)
        .then( results => {
            res.redirect('/products')
        })
        .catch( err => {
            console.log('err', err);
        })
    }
});

Router.get('/products/:id', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { id } = req.params;
        DS_Prod.getProductById(id)
        .then( results => {
            const product = results.rows[0];
            // console.log('product', product);
            res.render('productDetail', product);
        })
        .catch( err => {
            console.log('err', err);
        })
    }
})

Router.get('/products/:id/edit', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { id } = req.params;
        DS_Prod.getProductById(id)
        .then( results => {
            const product = results.rows[0];
            res.render('updateProduct', {product});
        })
        .catch( err => {
            console.log('err', err);
        })  
    }
})

Router.put('/products/:id/edit', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { id } = req.params;
        const newInfo = req.body;
        DS_Prod.updateProductById(newInfo, id)
        .then( results => {
            const product = results.rows[0];
            res.redirect(`/products/${id}`)
        })
        .catch( err => {
            console.log('err', err);
        })
    }
});

Router.get('/products/:id/delete', (req, res) => {
    if (!authorized) {
        res.redirect('/login');
    } else {
        const { id } = req.params;
        DS_Prod.deleteProductById(id)
        .then( results => {
            DS_Prod.all()
            .then( results => {
                const products = results.rows;
                res.render('products', {products});
            })
            .catch( err => {
                console.log('err', err);
            })
        })
        .catch( err => {
            console.log('error', err);
        })
    }
})

module.exports = Router;