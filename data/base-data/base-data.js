const ModelState = require('../model-state');

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
        const modelState = this.validate(model);
        if (!modelState.isValid) {
            return Promise.reject(modelState.errors);
        }
        return this.collection.insert(model)
            .then((status) => {
                // conatins the created Id
                return status.ops[0];
                // return model;
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

    validate(model) {
        if (!this.validator || typeof this.validator.isValid !== 'function') {
            return ModelState.valid();
        }

        return this.validator.isValid(model);
    }
}

module.exports = BaseData;
