const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/');
const auth = require('../../middleware/auth');

const User = require('../../models/User')
const Chest = require('../../models/Chest')

// @route       POST api/chests
// @desc        Create a Chest
// @access      Private
router.post('/', [ auth, [
    check('chestColor', 'Chest color is required!').not().isEmpty(),
    check('prizeName', 'Prize name is required!').not().isEmpty(),
] ], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Validate user
    const user = await User.findById(req.user.id).select('-password');
    if(user.permission != 2) {
        return res.status(401).json({ errors: 'You are not authorized to add chests.'});
    }

    try {
    
        const newChest = new Chest({
            chestColor: req.body.chestColor,
            prizeName: req.body.prizeName,
            img: req.body.img,
            value: req.body.value,
            description: req.body.description
        })

        const chest = await newChest.save();
        res.json(chest);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
    
});

// @route       GET api/chests
// @desc        Get all Chests
// @access     Private
router.get('/', auth, async (req, res) => {
    try {
        const chests = await Chest.find()
        res.json(chests);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');        
    }
});

// @route       GET api/chests/:id
// @desc        Get chest by ID
// @access     Private
router.get('/:id', auth, async (req, res) => {
    try {
        const chest = await Chest.findById(req.params.id);
        
        if(!chest){
            return res.status(404).json({ msg: 'Chest not found'});
        }
        
        res.json(chest);

    } catch (err) {
        console.log(err.message);
        if(!err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Chest not found'});
        }
        res.status(500).send('Server Error');        
    }
});


// @route       DELETE api/chests/:id
// @desc        Delete a Chest
// @access     Private
router.delete('/:id', auth, async (req, res) => {

    // Validate user
    const user = await User.findById(req.user.id).select('-password');
    if(user.permission != 2) {
        return res.status(401).json({ errors: 'You are not authorized to delete chests.'});
    }

    try {
        const chest = await Chest.findById(req.params.id);

        if(!chest){
            return res.status(404).json({ msg: 'Chest not found'});
        }
                
        await chest.remove();

        res.json({ msg: 'Chest removed' });

    } catch (err) {
        console.log(err.message);
        if(!err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Chest not found'});
        }
        res.status(500).send('Server Error');        
    }
});

module.exports = router;