const db = require("../prisma/queries");


exports.getFolderForm = async (req, res) => {
    if (!req.user) {
        return res.redirect("/sign-in")
    }
    const folders = await db.allUserFolders(req.user.id); 
    return res.render("folderForm", {
        folders: folders
    });
}

exports.postFolderForm = async (req, res) => {
    const folder = {
        name: req.body.name,
        parentId: req.body.parentFolder
    }
    await db.createFolder(folder, req.user); 
    res.redirect("/");
}

exports.getFolderById = async (req, res) => {
    const { id } = req.params;
    const folder = await db.getFolderById(id);
    const path = await db.getFolderPath(parseInt(id))
    folder.folderPath = path; 
    return res.render("folder", {
        folder: folder
    })
}

exports.postDeleteFolder = async (req, res, next) => {
    const { id } = req.params;
    await db.deleteFolder(parseInt(id))
        .then(() => {
            return res.redirect("/");
        })
        .catch(err => {
            console.error(err);
            return next(err);
        })
}