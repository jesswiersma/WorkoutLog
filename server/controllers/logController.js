const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const {LogModel} = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send("Hey! This is a practice route!")
});

router.get('/about', (req, res) => {
    res.send("This is the about route!")
})

// CREATE LOG POST //

router.post('/', validateJWT, async (req, res) => {
    const {description, definition, result} = req.body;
    const {id} = req.user;

    const newLog = {
        description,
        definition,
        result,
        owner: id
    }

    try {
        const newLog = await LogModel.create(newLog);
        res.status(200).json(newLog);

    } catch (err) {
        res.status(500).json({error: err });
    }
    LogModel.create(newLog);
        
    });


// GETS ALL LOG POSTS FOR INDIVIDUAL USER //

router.get("/", async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


// GETS LOGS BY USER //

router.get("/:id", validateJWT, async (req, res) => {
    let {id} = req.user;
    try {
        const userLog = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLog);
    } catch (err) {
        res.status(500).json ({ error: err});
    }
});

// UPDATE LOG //

router.put("/:id", validateJWT, async (req, res) => {
    const {description, definition, result} = req.body;
    const {id} = req.user;

    const query = {
        where : {
            id: entryId,
            owner: userId
        }
    };

    const updatedLog = {
        description,
        definition,
        result,
        owner: id
    };

    try {
        const update = await LogModel.update(updatedLog, query);
        res. status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

// DELETE LOG POST //

router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const entryId = req.params.id;

    try {
        const query = {
            where: {
                id: entryId,
                owner: ownerId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({message: "Log entry removed"});
    } catch (err) {
        res.status(500).json({error: err});
    }
})




module.exports = router;