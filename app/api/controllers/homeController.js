var homeController = {
    HomePage: function (req, res, next) {

        res.send('<h1>Hello in UAM web app.</h1> <br>  ' + 
        'API list of end points: <br>' + 
        '<b>/main</b> - homeController<br>' +
        '<b>/resident</b> - residentController. Fetch all data from table "Residents".<br>' +
        '<b>/resident/:id</b> - Fetch data with specific id. </br>' +
        '<b>/resident/:id/delete</b> Delete resident with specific id.');

    }
}

module.exports = {
    HomeController: homeController
};

