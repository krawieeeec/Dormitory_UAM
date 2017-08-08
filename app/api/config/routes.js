var express = require('express');
var bodyParser = require('body-parser');

var homeCtrl = require('../controllers/homeController.js').HomeController;
var residentCtrl = require('../controllers/residentController.js').ResidentController;
var dormitoryCtrl = require('../controllers/dormitoryController').DormitoryController;
var residentAddressCtrl = require('../controllers/residentAddressController').ResidentAddressController;
var residentStayCtrl = require('../controllers/residentStayController').ResidentStayController;
var documentCtrl = require('../controllers/documentController').DocumentController;

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


//homeController
router.route('/main').get(homeCtrl.HomePage);

//residentController
router.use(residentCtrl.FormResponseObject);
router.route('/resident').get(residentCtrl.GetAllResidents);
router.route('/resident/create').post(residentCtrl.AddResident);
router.route('/resident/:id').get(residentCtrl.GetResidentById);
router.route('/resident/:id/delete').delete(residentCtrl.DeleteResidentById);
router.route('/resident/:id/update').put(residentCtrl.UpdateResidentById);

//residentAddressController
router.use(residentAddressCtrl.FormResponseObject);
router.route('/residentAddress').get(residentAddressCtrl.GetAllResidentAddress);
router.route('/residentAddress/:id').get(residentAddressCtrl.GetResidentAddressById);

//residentStayController
router.use(residentStayCtrl.FormResponseObject);
router.route('/residentStay').get(residentStayCtrl.GetAllResidentsStays);
router.route('/residentStay/:id').get(residentStayCtrl.GetResidentStayById);

//documentController
router.use(documentCtrl.FormResponseObject);
router.route('/document').get(documentCtrl.GetAllResidentDocuments);
router.route('/document/:id').get(documentCtrl.GetResidentDocumentById);

//dormitoryController
router.use(dormitoryCtrl.FormResponseObject);
router.route('/dormitory').get(dormitoryCtrl.GetAllDormitories);
router.route('/dormitory/:id').get(dormitoryCtrl.GetAllResidentsOfDormitory);


module.exports = router;
