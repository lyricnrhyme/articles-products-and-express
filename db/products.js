class Products {
    constructor() {
        this.knex = require('../knex/knex.js');
        this._count = 1;
        this._storage = [];
        this.add({
            name: 'Sword',
            price: '5.00',
            inventory: 10
        })
        this.add({
            name: 'Shield',
            price: '3.00',
            inventory: 10
        })
        this.add({
            name: 'Fairy',
            price: '0.50',
            inventory: 1
        })
    }

    all() {
        return this.knex.raw('SELECT * FROM products')
    }

    getProductById(id) {
        return this.knex.raw(`SELECT * FROM products WHERE id=${id}`);
    }

    add(product) {
        return this.knex.raw(`INSERT INTO products (name, price, inventory, created_at, updated_at) VALUES ('${product.name}', '${product.price}', '${product.inventory}', now(), now())`);
    }

    updateProductById(newInfo, id) {
        return this.knex.raw(`UPDATE products SET name='${newInfo.name}', price='${newInfo.price}', inventory='${newInfo.inventory}', updated_at=now() WHERE id=${id}`)
    }

    deleteProductById(id) {
        return this.knex.raw(`DELETE FROM products WHERE id=${id}`);
    }
}

module.exports = Products;