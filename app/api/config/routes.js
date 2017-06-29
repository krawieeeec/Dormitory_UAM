var express = require('express');
var router = express.Router();

var homeCtrl = require('../controllers/homeController.js').HomeController;
var residentCtrl = require('../controllers/residentController.js').ResidentController;

//homeController
router.route('/main').get(homeCtrl.HomePage);
//residentController
router.route('/resident').get(residentCtrl.GetAllResidents);
router.route('/resident/:id').get(residentCtrl.GetResidentByID);
router.route('/resident/:id/delete').get(residentCtrl.DeleteResidentByID);


module.exports = router;
