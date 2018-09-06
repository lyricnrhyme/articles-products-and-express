class Articles {
    constructor() {
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
        this._storage.push(article);
    }
    updateArticleByTitle(title) {
        let select = this._storage.getArticleByTitle(title);
        let index = this._storage.indexOf(select);
        return index;
    }

    deleteArticleByTitle(title) {
    }
}

module.exports = Articles;