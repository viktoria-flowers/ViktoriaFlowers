const { authHelper } = require('../utils');

class Item {
    constructor() {

    }
}

class Data {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this.getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        const filter = {};
        const options = {};
        return this.collection().find(filter, options).toArray();
    }

    create(model) {
        return this.collection.insert(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}


const init = (db) => {
    return Promise.resolve({
        items: new Data(db, Item),
    });
};



module.exports = {
    init,
};
