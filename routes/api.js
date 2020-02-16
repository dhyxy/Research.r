const express = require('express');
const router = express.Router();
const ResearchPost = require('../models/researchPost');

router.get('/', (req, res) => {

    ResearchPost.find({   })
    .then((data) => {
        console.log('error: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });
});

router.post('/save', (req, res) => {
    const data = req.body;
    const newResearchPost = new ResearchPost(data);
    newResearchPost.save((error) => {
        if(error) {
            res.status(500).json({msg: 'internal issues'});
            return;
        }
        return res.json({
            msg:'ur data saved'
        });
    });
});


router.get('/name', (req, res) => {
    const data = {
        username: 'apaesi',
        age: 3
    };
    res.json(data);
});

module.exports = router;