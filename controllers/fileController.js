const db = require("../prisma/queries");
const fs = require("node:fs") //remove when moving to cloud storage

const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

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
    const file = await db.getFileById(id)
    res.render("fileDetail", {
        file: file
    })
}
exports.postDeleteFile = async (req, res) => {
    const { id } = req.params; 
    const file = await db.getFileById(id)
    await db.deleteFileById(id)
        .then(() => {
            fs.unlink(`./public/data/uploads/${file.name}`, err => {
                if (err) {
                    if (err.code == "ENOENT"){
                        console.error("file does not exist")
                    } else { 
                        return next(err);
                    }
                } else { 
                    console.log("file deleted!")
                }

            })
            return res.redirect("/")
        })
        .catch(err => {
            console.error(err); 
            return next(err)
        })
}

exports.getFileById = async (req, res) => {
    const { id } = req.params; 
    const file = await db.getFileById(id)
    res.render("fileDetail", {
        file: file
    })
}