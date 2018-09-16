class Articles {
    constructor() {
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
        return [...this._storage];
    }
    getArticleByTitle(title) {
        return this._storage.filter(item => title == item.title)[0];
    }
    add(article) {
        article.id = this._count;
        this._storage.push(article);
        this._count++;
        return article.id;
    }
    deleteArticleByTitle(title) {
        let select = this._storage.filter(item => title == item.title)[0];
        console.log('test', select);
        let index = this._storage.indexOf(select);
        console.log('test2', index);
        this._storage.splice(index, 1);
    }
}

module.exports = Articles;