const ModelState = require('../modelstate');

class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.validator = validator;
        this.collectionName = ModelClass.name.toLowerCase() + 's';
        this.collection = db.collection(this.collectionName);
    }

    getAll(filters) {
        if (filters) {
            return this.collection.find(filters).toArray();
        }

        return this.collection.find().toArray();
    }

    create(model) {
        const modelState = this.isValid(model);
        if (modelState.isValid) {
            return Promise.reject(modelState.errors);
        }

        return this.collection.insert(model)
            .then(() => {
                // TODO: refactor, parameters?, should return the whole model? 
                return model;
            });
    }

    /*
        findOrCreateBy(props) do we need this function ?
        https://github.com/TelerikAcademy/Web-Applications-with-Node.js/blob/master/Live-demos/project-structure/data/base/base.data.js  
     */

     updateById(model) {
         return this.collection.updateOne({
            _id: model._id,
         }, model);
     }

    isValid(model) {
        if (!this.validator || typeof this.validator.isValid !== 'function') {
            return new ModelState.Valid();
        }

        return this.validator.isValid(model);
    }
}

module.exports = BaseData;
