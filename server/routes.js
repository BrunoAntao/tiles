module.exports = function (app) {

    app.get('/map', function (req, res) {

        res.render('mapEditor.ejs');

    });

    app.get('/resource', function (req, res) {

        res.render('resourceEditor.ejs');

    });

};