const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//     try {
//         const postData = await Post.

//     } catch (err){
//         res.status(500).json(err);
//     }
// })



router.get("/dashboard", async (req, res) => {
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

module.exports = router;