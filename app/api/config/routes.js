var express = require('express');
var bodyParser = require('body-parser');

var homeCtrl = require('../controllers/homeController.js').HomeController;
var residentCtrl = require('../controllers/residentController.js').ResidentController;
var dormitoryCtrl = require('../controllers/dormitoryController').DormitoryController;

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


//homeController
router.route('/main').get(homeCtrl.HomePage);
//residentController
router.use(residentCtrl.FormResponseObject);
router.route('/resident').get(residentCtrl.GetAllResidents);
router.route('/resident/create').post(residentCtrl.AddResident);
router.route('/resident/:id').get(residentCtrl.GetResidentByID);
router.route('/resident/:id/delete').delete(residentCtrl.DeleteResidentByID);
router.route('/resident/:id/update').put(residentCtrl.UpdateResidentByID);
//dormitoryController
router.use(dormitoryCtrl.FormResponseObject);
router.route('/dormitory').get(dormitoryCtrl.GetAllDormitories);
router.route('/dormitory/:id').get(dormitoryCtrl.GetAllResidentsOfDormitory);


module.exports = router;
