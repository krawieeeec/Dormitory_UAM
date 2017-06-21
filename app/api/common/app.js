const dbModels = require('../models/models.js').DataBaseModels;

dbModels.sync({force: true});
