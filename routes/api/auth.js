const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Auth = require('../../models/Auth');
const keys = require('../../config/keys')

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

// @route GET /api/users/login
// desc Login user / Returning Jwt Token
// @access public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password

    // Find user by email 
    Auth.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'Email not found' });
            }

            // Check Password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // res.json({ msg: 'success' })
                    // sending Jwt token when password matches

                    const payload = {
                        id: user.id,
                        email: user.email
                    }
                    //sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600 }, (err, token) => {
                            res.json({ success: true, token: 'Bearer ' + token })
                        })

                }
                else {
                    return res.status(400).json({ password: 'Password incorrect' })
                }
            })

        })
})



module.exports = router