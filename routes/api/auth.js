const router = require('express').Router();
const bcrypt = require('bcryptjs')

const Auth = require('../../models/Auth');

// @route GET /api/posts/test
// desc Tests auth route
// @access public route
router.get('/test', (req, res) => {
    res.json({ msg: "Auth Works" })
})

// @route GET /api/users/register
// desc Register user
// @access public

router.post('/register', (req, res) => {
    Auth.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        }
        else {
            const newUser = new Auth({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email,
                registerNumber: req.body.registerNumber,
                phoneNumber: req.body.phoneNumber
            });
            bcrypt.genSalt(10, (er, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => { res.json(user) })
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

module.exports = router