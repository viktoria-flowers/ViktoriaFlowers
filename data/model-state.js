class ModelState {
    constructor(errors) {
        this.errors = errors || [];
        this.isValid = true;

        if (this.errors.length && this.errors.length > 0) {
            this.isValid = false;
        }
    }

    /**
     * @param { String } errorText 
     */
    addError(errorText) {
        if (typeof this.errors === 'undefined' ||
            typeof this.errors.length === 'undefined') {
            this.errors = [];
        }

        if (!errorText) {
            return;
        }

        this.isValid = false;
        this.errors.push(errorText);
    }

    /**
     * @example 
     * let modelState = ModelState.Valid();  
     * // modelState.isValid is true  
     * @return { ModelState } Returns Valid model state 
     */
    static valid() {
        return new this();
    }
}

module.exports = ModelState;
