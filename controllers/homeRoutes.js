const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
   res.render("homepage");
})

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
        // res.status(200).json(posts);

        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err);
    }
})

router.get("/post", withAuth, (req, res) =>{
    res.render("post")
})

router.get("/post/:id", withAuth, async (req, res) => {
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
        res.redirect("/dashboard");
        // res.status(200).json({ message: "dashboard html doesn't exist yet" })
        return;
    }

    res.render("login")
})

module.exports = router;