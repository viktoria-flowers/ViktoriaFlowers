const {
    ApiController, AuthController, ProfileController,
    ProductController, ImagesController, UsersController,
} = require('./');
console.log(UsersController);
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
