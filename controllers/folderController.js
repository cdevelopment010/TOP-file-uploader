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

    console.log(folder);
    return res.render("folder", {
        folder: folder
    })
}