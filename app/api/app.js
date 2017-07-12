const dbModels = require('./models/models.js').DataBaseModels;
// During changes in models you must drop all tables and afresh use sync function
//dbModels.sync({force: true});
//dbModels.drop({force: true});

module.exports = {
    SynchronizationTables: dbModels
}
