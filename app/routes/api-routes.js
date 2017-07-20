const test = (app) => {
    app.get('/api', (req, res) => {
        // usersService returns users from datbase(Mongo)
        // const users = usersService.getAllUsers();
        // return res.render('usersView', users);
        return res.json({ message: 'Ajax works' });
    });

    app.post('/api/subscribe', (req, res) => {
        // usersService returns users from datbase(Mongo)
        // const users = usersService.getAllUsers();
        // return res.render('usersView', users);
        return res.json({ message: 'Ajax works' });
    });
};

module.exports = test;
// Here are the ajax requests send from the user
// const items = [{
//     'name': 'Martina',
//     'id': 232,
// }];
// const { Router } = require('express');

// const userAjaxRequestsRoutes = function(app) {
//         const router = new Router();

//         router.get('/', (req, res) => {
//             res.send(items);
//         })
//             .post('/', (req, res) => {
//                 const item = req.body;
//                 item.id = items.length + 1;
//                 items.push(item);
//                 console.log(items);
//                 res.send(true).status(201);
//             })
//             .get('/:id', (req, res) => {
//                 const id = +req.params.id;
//                 const wantedItem = items.find((i) => i.id === id);

//                 if (!wantedItem) {
//                     return res.status(404)
//                               .send({
//                                   error: 'Item not found',
//                               });
//                 }

//                 return res.send(wantedItem);
//             });

//         app.use('/api/items', router);
// };

// module.exports = userAjaxRequestsRoutes;

