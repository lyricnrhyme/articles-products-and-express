exports.seed = function(knex, Promise) {
    return knex('products').del()
        .then(function () {
            return knex('products').insert([
                {name: 'Sword', price: '5.00', inventory: 10}, 
                {name: 'Shield', price: '3.00', inventory: 10}, 
                {name: 'Fairy', price: '0.50', inventory: 1}
            ])
        })
}