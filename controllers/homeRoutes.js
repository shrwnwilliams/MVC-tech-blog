const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//     try {
        

//     } catch (err){
//         res.status(500).json(err);
//     }
// })



router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.status(200).json(posts);

    } catch (err){
        res.status(500).json(err);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ]
        });
    
        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err)
    }
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        // res.redirect("/dashboard");
        res.status(200).json({ message: "dashboard html doesn't exist yet" })
        return;
    }

    res.status(400).json({ message: "you must log in first" })
})

module.exports = router;