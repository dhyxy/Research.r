const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const ResearchPostSchema = new Schema({
    researchTitle: String,
    professorName: String,
    professorEmail: String,
    projectDescription: String,
    date: {
        type: String,
        default: Date.now()
    }
});

//model
const ResearchPost = mongoose.model('ResearchModel', ResearchPostSchema);


module.exports = ResearchPost;