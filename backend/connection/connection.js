const mongoose =  require('mongoose');
async function connectmongodb(url) {
    mongoose.connect(url);
}
module.exports = {connectmongodb};