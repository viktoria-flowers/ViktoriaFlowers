const imageRoutes = (app, imagesController) => {
    app.get('/images/:id/:name/', (req, res) => {
        return imagesController.getImage(req, res);
    });
};

module.exports = imageRoutes;
