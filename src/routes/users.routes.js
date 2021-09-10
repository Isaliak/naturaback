const { Router } = require('express');

const router = Router()

router.get('/users', (req, res) => {
    res.json({
        msg: 'get api'
    })
})
router.post('/crear', (req, res) => {

    const body = req.body
    res.json({ body, msg: 'esta en users' })
})

module.exports = router