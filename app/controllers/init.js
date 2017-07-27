const {
    ApiController, AuthController, ProfileController,
    ProductController, ImagesController,
} = require('./');

const init = (data) => {
    return {
        apiController: new ApiController(data),
        authController: new AuthController(data),
        profileController: new ProfileController(data),
        productController: new ProductController(data),
        imagesController: new ImagesController(data),
    };
};

module.exports = { init };
