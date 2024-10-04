const db = require("../prisma/queries");

exports.getHomePage = async (req, res) => {
    if (!req.user) {
        return res.redirect("/sign-in");
    }
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

exports.deleteUser = async (req, res, next) => {
    if (!req.user) {
        return res.redirect("/sign-in");
    }
    const { id } = req.params;
    await db.deleteUser(parseInt(id))
        .then(() => {
            return res.redirect("/");
        })
        .catch(err => {
            console.error(err);
            return next(err);
        })
}