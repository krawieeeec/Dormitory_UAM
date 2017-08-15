var express = require('express');
var bodyParser = require('body-parser');

var homeCtrl = require('../controllers/homeController.js').HomeController;
var citzenshipCtrl = require('../controllers/citzenshipController').CitzenshipController;
var dormitoryCtrl = require('../controllers/dormitoryController').DormitoryController;
var documentCtrl = require('../controllers/documentController').DocumentController;

//residentsControllers
var residentCtrl = require('../controllers/resident/residentController.js').ResidentController;
var residentPersonalDataCtrl = require('../controllers/resident/residentPersonalDataController').ResidentPersonalDataController;
var residentAddressCtrl = require('../controllers/resident/residentAddressController').ResidentAddressController;
var residentDormitoryCtrl = require('../controllers/resident/residentDormitoryController').ResidentDormitoryController;
var residentDocumentCtrl = require('../controllers/resident/residentDocumentController').ResidentDocumentController;

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.route('/main').get(homeCtrl.HomePage);

//residentController - old controller
router.use(residentCtrl.FormResponseObject);
router.route('/resident').get(residentCtrl.GetAllResidents);
router.route('/resident/create').post(residentCtrl.AddResident);
router.route('/resident/:id').get(residentCtrl.GetResidentById);
router.route('/resident/:id/delete').delete(residentCtrl.DeleteResidentById);
router.route('/resident/:id/update').put(residentCtrl.UpdateResidentById);

//residentPersonalDataController
router.use(residentPersonalDataCtrl.FormResponseObject);
router.route('/resident/personalData').post(residentPersonalDataCtrl.CreateNewResidentPersonalData);
router.route('/resident/:id/personalData').get(residentPersonalDataCtrl.GetResidentPersonalDataById);
router.route('/resident/:id/personalData').put(residentPersonalDataCtrl.UpdateResidentPersonalDataById);

//residentDocumentController
router.use(residentDocumentCtrl.FormResponseObject);
router.route('/resident/document').post(residentDocumentCtrl.CreateNewResidentDocument);
router.route('/resident/:id/document').get(residentDocumentCtrl.GetResidentDocumentById);
router.route('/resident/:id/document').put(residentDocumentCtrl.UpdateResidentDocumentById);

//residentAddressController
router.use(residentAddressCtrl.FormResponseObject);
router.route('/resident/address').post(residentAddressCtrl.CreateNewResidentAddress);
router.route('/resident/:id/address').get(residentAddressCtrl.GetResidentAddressById);
router.route('/resident/:id/address').put(residentAddressCtrl.UpdateResidentAddressById);

//residentDormitoryController
router.use(residentDormitoryCtrl.FormResponseObject);
router.route('/resident/dormitory').post(residentDormitoryCtrl.CreateNewResidentStay);
router.route('/resident/:id/dormitory').get(residentDormitoryCtrl.GetResidentStayDormitoryById);
router.route('/resident/:id/dormitory').put(residentDormitoryCtrl.UpdateResidentStayDormitoryById);

//documentController
router.use(documentCtrl.FormResponseObject);
router.route('/document').get(documentCtrl.GetAllResidentDocuments);
router.route('/document/:id').get(documentCtrl.GetResidentDocumentById);

//dormitoryController
router.use(dormitoryCtrl.FormResponseObject);
router.route('/dormitory').get(dormitoryCtrl.GetAllDormitories);
router.route('/dormitory/:id').get(dormitoryCtrl.GetAllResidentsOfDormitory);

//citzenshipController
router.use(citzenshipCtrl.FormResponseObject);
router.route('/citzenship').get(citzenshipCtrl.GetAllCitzenships);
router.route('/citzenship/:id').get(citzenshipCtrl.GetCitzenshipById);

module.exports = router;
