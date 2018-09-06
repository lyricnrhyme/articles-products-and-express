class Products {
    constructor() {
        this._count = 1;
        this._storage = [];
        this.add({
            name: 'Sword',
            price: '$5.00',
            inventory: 10
        })
        this.add({
            name: 'Shield',
            price: '$3.00',
            inventory: 10
        })
        this.add({
            name: 'Fairy',
            price: '$0.50',
            inventory: 1
        })
    }
    all() {
        return [...this._storage];
    }
    getProductById(id) {
        return this._storage.filter(item => id == item.id)[0];
    }
    add(product) {
        product.id = this._count;
        this._storage.push(product);
        this._count++;
        return product.id;
    }
    updateProductById(id) {

    }

    deleteProductById(id) {
        
    }
}

module.exports = Products;