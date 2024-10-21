const db = require("../prisma/queries");

exports.getFileForm = async (req, res, next) => {
    const folders = await db.allUserFolders();
    return res.render("uploadFile", {
        folders: folders
    }); 
}

exports.postFileForm = async (req, res, next) => {
    const fileData = { 
        name: req.file.originalname, 
        path: req.file.path,
        size: req.file.size,
        userId: req.user.id,
        folderId: req.body.folderId
    }; 

    try {
        const file = await db.createFile(fileData); 
        const fileId = file.id;
        return res.redirect(`/file/${fileId}`);
    } catch(err) {
        console.error(err); 
        return next(err);
    }
}

exports.getDeleteFile = async (req, res) => {
    const { id } = req.params; 
    const file = db.getFileById(id)
    res.render("fileDetail", {
        file: file
    })
}
exports.postDeleteFile = async (req, res) => {
    const { id } = req.params; 
    const file = db.getFileById(id)
    res.render("fileDetail", {
        file: file
    })
}

exports.getFileById = async (req, res) => {
    const { id } = req.params; 
    const file = await db.getFileById(id)
    res.render("fileDetail", {
        file: file
    })
}