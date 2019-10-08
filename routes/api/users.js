const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/');

const User = require('../../models/User')


// @route       POST api/users
// @desc        Register a new user
// @access      Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters.').isLength({ min: 6 })
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
            // See if user exists
            let user = await User.findOne({ email: email})

            if(user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
            }
        
            user = new User({
                name,
                email,
                password
            })

            // Encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
        
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtToken'),
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            )
            
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }


});


// @route       GET api/users
// @desc        Get all users
// @access      Private
router.get('/', auth, async (req, res) => {

    try {
        const users = await User.find().populate('user');
        res.json(users);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route       GET api/users/:id
// @desc        Get one user 
// @access      Private
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user)
            return res.status(400).json({ msg: 'That user does not exist' });
            
            res.json(user);
        } catch (err) {
            console.log(err.message);
            if(err.kind == "ObjectId") {
                return res.status(400).json({ msg: 'That user does not exist' });
        }
        res.status(500).send('Server Error');
    }
})


// @route       DELETE api/users/:id
// @desc        Delete a user
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
       const user = await User.findById(req.params.id);

       if(!user) {
           return res.status(404).json({ msg: 'User not found' });
       }

       await user.remove();

       res.json({ msg: 'User removed'})
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})



// @route       PUT api/users/keys/:id&:keycount&:action
// @desc        Add/Remove key(s) to user
// @access      Private
router.put('/keys/:id/:keycount/:action', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const keycount = req.params.keycount;
        const action = req.params.action; // Can be "add" or "remove"

        if(!user) {
            return res.status(404).json({ msg: 'User not found'});
        }
        if(!keycount || keycount <= 0) {
            return res.status(400).json({ msg: 'Enter a valid amount of keys'});
        }


        if(action === 'add') {
            user.currentKeys = user.currentKeys + parseInt(keycount);
            user.totalKeys = user.totalKeys + parseInt(keycount);

            await user.save();
            res.json(user)
        } else if (action ==='remove') {
            if(user.currentKeys < keycount) {
                return res.status(400).json({ msg: 'Not enough keys!' });
            }

            user.currentKeys = user.currentKeys - parseInt(keycount);
            await user.save();
            res.json(user);
        } else {
            return res.status(404).json({ msg: 'Invalid argument'})
        }


    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;