const router = require('express').Router();

// @route GET /api/posts/test
// desc Tests post route
// @access public route
router.get('/test', (req, res) => {
    res.json({ msg: "Auth Works" })
})

module.exports = router