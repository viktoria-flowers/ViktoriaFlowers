const {
    ApiController,
    AuthController,
    ProfileController,
    ProductController,
    ImagesController,
    UsersController,
} = require('./');

const init = (data) => {
    return {
        apiController: new ApiController(data),
        authController: new AuthController(data),
        profileController: new ProfileController(data),
        productController: new ProductController(data),
        imagesController: new ImagesController(data),
        usersController: new UsersController(data),
    };
};

module.exports = { init };
