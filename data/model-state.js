class ModelState {
    constructor(isValid, errors) {
        this.isValid = isValid || false;
        this.errors = errors;
    }

/**
 * @example 
 * let modelState = ModelState.Valid();  
 * // modelState.isValid is true  
 * // modelState.errors is null  
 * @return { ModelState } Returns Valid model state 
 */
    static valid() {
        return new this(true, null);
    }
}

module.exports = ModelState;
