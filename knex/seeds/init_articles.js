exports.seed = function(knex, Promise) {
    return knex('articles').del()
        .then(function () {
            return knex('articles').insert([
                {title: 'Winnie the Pooh', description: 'Honey', author: 'Great Dude'}, 
                {title: 'Catcher in the Rye', description: 'Why Doe', author: 'Angry Dude'}, 
                {title: 'Harry Potter', description: 'Avada', author: 'Boss Lady Dude'}
            ])
        })
}