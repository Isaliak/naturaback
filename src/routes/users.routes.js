const { Router } = require('express');

const router = Router()

router.get('/users', (req, res) => {
    res.json({
        msg: 'get api'
    })
})

module.exports = router