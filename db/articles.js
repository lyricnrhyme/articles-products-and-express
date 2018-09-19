class Articles {
    constructor() {
        this.knex = require('../knex/knex.js');
        this._count = 1;
        this._storage = [];
        this.add({
            title: 'Winnie the Pooh',
            description: 'Honey',
            author: 'Great Dude'
        })
        this.add({
            title: 'Catcher in the Rye',
            description: 'Why Doe',
            author: 'Angry Dude'
        })
        this.add({
            title: 'Harry Potter',
            description: 'Avada',
            author: 'Boss Lady Dude'
        })
    }

    all() {
        return this.knex.raw('SELECT * FROM articles')
    }

    getArticleByTitle(title) {
        return this.knex.raw(`SELECT * FROM articles WHERE id=${id}`)
    }

    add(article) {
        return this.knex.raw(`INSERT INTO articles (title, author, description, created_at, updated_at) VALUES ('${article.title}', '${article.author}', '${article.description}', now(), now())`);
    }

    updateArticleById(newInfo, id) {
        return this.knex.raw(`UPDATE articles SET title='${newInfo.title}', author='${newInfo.author}', description='${article.description}', updated_at=now() WHERE id=${id}`)
    }

    //DO DIS
    deleteArticleByTitle(title) {
        return this.knex.raw(``)
    }
}

module.exports = Articles;