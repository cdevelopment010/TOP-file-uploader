const db = require("../prisma/queries");

exports.getHomePage = async (req, res) => {
    const folders = await db.allUsersFoldersStructure(req.user.id);

    res.render("home",{
        folders: folders
    });
}

exports.signOut = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
}