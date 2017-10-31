var express = require('express');
var bodyParser = require('body-parser');

var citzenshipCtrl = require('../controllers/citzenshipController').CitzenshipController;
var dormitoryCtrl = require('../controllers/dormitoryController').DormitoryController;
var typeAddressCtrl = require('../controllers/typeAddressController').TypeAddressController;
var typeDocumentCtrl = require('../controllers/typeDocumentController').TypeDocumentController;
var cityCtrl = require('../controllers/cityController').CityController;
var blockadeHistoryCtrl = require('../controllers/blockadeHistoryController').BlockadeHistoryController;
var accountEmployeeCtrl = require('../controllers/accountEmployeeController').AccountEmployeeController;

//residentControllers
var residentPersonalDataCtrl = require('../controllers/resident/residentPersonalDataController').ResidentPersonalDataController;
var residentAddressCtrl = require('../controllers/resident/residentAddressController').ResidentAddressController;
var residentDormitoryCtrl = require('../controllers/resident/residentDormitoryController').ResidentDormitoryController;
var residentDocumentCtrl = require('../controllers/resident/residentDocumentController').ResidentDocumentController;
var residentAccountCtrl = require('../controllers/resident/residentAccountController').ResidentAccountController;
var residentSearchCtrl = require('../controllers/resident/residentSearchController').ResidentSearchController;

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
router.route('/resident/:id/document').get(residentDocumentCtrl.GetResidentDocumentsById);
router.route('/resident/document').put(residentDocumentCtrl.UpdateResidentDocumentById);
router.route('/resident/:id/document').delete(residentDocumentCtrl.DeleteResidentDocumentById);


//residentAddressController
router.use(residentAddressCtrl.FormResponseObject);
router.route('/resident/address').post(residentAddressCtrl.CreateNewResidentAddress);
router.route('/resident/:id/address').get(residentAddressCtrl.GetResidentAddressById);
router.route('/resident/address').put(residentAddressCtrl.UpdateResidentAddressById);
router.route('/resident/:id/address').delete(residentAddressCtrl.DeleteResidentAddressById);

//residentDormitoryController
router.use(residentDormitoryCtrl.FormResponseObject);
router.route('/resident/dormitory').post(residentDormitoryCtrl.CreateNewResidentStay);
router.route('/resident/:id/dormitory').get(residentDormitoryCtrl.GetResidentStayDormitoryById);
router.route('/resident/:id/dormitory').put(residentDormitoryCtrl.UpdateResidentStayDormitoryById);

//residentAccountController
router.use(residentAccountCtrl.FormResponseObject);
router.route('/resident/account').get(residentAccountCtrl.GetAllResidentAccounts);
router.route('/resident/account').post(residentAccountCtrl.CreateNewResidentAccount);
router.route('/resident/:residentId/account').get(residentAccountCtrl.GetResidentAccountsById);
router.route('/resident/:residentId/account/:dormitoryId').get(residentAccountCtrl.GetResidentAccountCurrentDormitoryById);
router.route('/resident/:residentId/account/:dormitoryId').put(residentAccountCtrl.UpdateResidentAccountById);

//residentSearchController
router.use(residentSearchCtrl.FormResponseObject);
router.route('/resident/search').post(residentSearchCtrl.FindResident);
router.route('/resident/exist').post(residentSearchCtrl.FindExistingResident);

//blockadeHistoryController
router.use(blockadeHistoryCtrl.FormResponseObject);
router.route('/residentAccount/blockadeHistory').get(blockadeHistoryCtrl.GetAllBlokckadeHistory);
router.route('/residentAccount/blockadeHistory').post(blockadeHistoryCtrl.CreateNewAccountResidentBlockade);
router.route('/residentAccount/:id/blockadeHistory').put(blockadeHistoryCtrl.UpdateAccountResidentBlockadeById);
router.route('/residentAccount/:id/blockadeHistory').delete(blockadeHistoryCtrl.DeleteAccountResidentBlockadeById);
router.route('/residentAccount/:residentId/blockadeHistory/:dormitoryId').get(blockadeHistoryCtrl.GetAllAccountResidentBlockadeHistoryById);

//accountEmployeeController
router.use(accountEmployeeCtrl.FormResponseObject);
router.route('/accountEmployee').get(accountEmployeeCtrl.GetAllAccountEmployees);
router.route('/accountEmployee').post(accountEmployeeCtrl.CreateAccountEmployee);
router.route('/accountEmployee/:id').get(accountEmployeeCtrl.GetAccountEmployeeById);

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

//dormitoryController
router.use(dormitoryCtrl.FormResponseObject);
router.route('/dormitory').get(dormitoryCtrl.GetAllDormitories);
router.route('/dormitory/:id/residents').get(dormitoryCtrl.GetAllResidentsOfDormitory);

//citzenshipController
router.use(citzenshipCtrl.FormResponseObject);
router.route('/citzenship').get(citzenshipCtrl.GetAllCitzenships);
router.route('/citzenship/:id').get(citzenshipCtrl.GetCitzenshipById);

module.exports = router;
