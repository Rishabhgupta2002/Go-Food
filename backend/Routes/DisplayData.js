const express = require("express");
const router = express.Router();

router.post("/foodData" ,async (req, res) => {
        try {
            // console.log(global.fooditems)
            res.send([global.fooditems,global.foodCategory])
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;
