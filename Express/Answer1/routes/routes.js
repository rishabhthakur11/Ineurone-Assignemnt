const express = require('express');

const router = express.Router()


//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

module.exports = router;