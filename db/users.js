class Users {
    constructor() {
        this._count = 1;
        this._storage = [];
        this.add({
            username: 'Bruh',
            password: 'Bruh'
        })
        this.add({
            username: 'Bro',
            password: 'Bro'
        })
        this.add({
            username: 'Brethren',
            password: 'Brethren'
        })
    }
    all() {
        return [...this._storage];
    }
    getUserByInfo(username, password) {
        return this._storage.filter(item => username == item.username && password == item.password)[0];
    }
    add(user) {
        user.id = this._count;
        this._storage.push(user);
        this._count++;
        return user.id;
    }

    deleteUserById(id) {
        let select = this._storage.filter(item => id == item.id)[0];
        console.log('test', select);
        let index = this._storage.indexOf(select);
        console.log('test2', index);
        this._storage.splice(index, 1);
    }
}

module.exports = Users;