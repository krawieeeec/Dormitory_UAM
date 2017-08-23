var express = require('express');
var bodyParser = require('body-parser');

var citzenshipCtrl = require('../controllers/citzenshipController').CitzenshipController;
var dormitoryCtrl = require('../controllers/dormitoryController').DormitoryController;
var documentCtrl = require('../controllers/documentController').DocumentController;
var typeAddressCtrl = require('../controllers/typeAddressController').TypeAddressController;
var typeDocumentCtrl = require('../controllers/typeDocumentController').TypeDocumentController;
var cityCtrl = require('../controllers/cityController').CityController;

//residentsControllers
var residentPersonalDataCtrl = require('../controllers/resident/residentPersonalDataController').ResidentPersonalDataController;
var residentAddressCtrl = require('../controllers/resident/residentAddressController').ResidentAddressController;
var residentDormitoryCtrl = require('../controllers/resident/residentDormitoryController').ResidentDormitoryController;
var residentDocumentCtrl = require('../controllers/resident/residentDocumentController').ResidentDocumentController;


var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

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

//cityController
router.use(cityCtrl.FormResponseObject);
router.route('/city').get(cityCtrl.GetAllCities);
router.route('/city/:id').get(cityCtrl.GetCityById);

//typeAddressController
router.use(typeAddressCtrl.FormResponseObject);
router.route('/typeAddress').get(typeAddressCtrl.GetAllTypeAddress);
router.route('/typeAddress/:id').get(typeAddressCtrl.GetTypeAddressById);

//typeDocumentController
router.use(typeDocumentCtrl.FormResponseObject);
router.route('/typeDocument').get(typeDocumentCtrl.GetAllTypeDocuments);
router.route('/typeDocument/:id').get(typeDocumentCtrl.GetTyoeDocumentById);

//documentController
router.use(documentCtrl.FormResponseObject);
router.route('/document').get(documentCtrl.GetAllResidentDocuments);
router.route('/document/:id').get(documentCtrl.GetResidentDocumentById);

//dormitoryController
router.use(dormitoryCtrl.FormResponseObject);
router.route('/dormitory').get(dormitoryCtrl.GetAllDormitories);
router.route('/dormitory/:id/residents').get(dormitoryCtrl.GetAllResidentsOfDormitory);

//citzenshipController
router.use(citzenshipCtrl.FormResponseObject);
router.route('/citzenship').get(citzenshipCtrl.GetAllCitzenships);
router.route('/citzenship/:id').get(citzenshipCtrl.GetCitzenshipById);

module.exports = router;
