const db = require("../prisma/queries");
const fs = require("node:fs") //remove when moving to cloud storage

const path = require("node:path");
const supabase = require("../config/supabase");
const assetsPath = path.join(__dirname, "public");

exports.getFileForm = async (req, res, next) => {
    const folders = await db.allUserFolders();
    return res.render("uploadFile", {
        folders: folders
    }); 
}

exports.postFileForm = async (req, res, next) => {
    const file = req.file; 
    if (!file) { return res.status(400).send("No file selected to upload.")}
    const filePath = `public/${Date.now()}-${file.originalname}`;
    const { data, error} = await supabase.storage
        .from("Files")
        .upload(filePath,file.buffer, {
            contentType: file.mimetype,
          });
    
    if (error) { return res.status(400).send("Error uploading file.")}

    // Generate a public URL for the uploaded file
    const { data: publicUrlData, error: urlError } = supabase.storage
        .from("Files")
        .getPublicUrl(filePath);

    if (urlError) {
        console.error("Error generating public URL:", urlError.message);
        return res.status(400).send("Error generating file URL.");
    }

    const fileData = { 
        name: req.file.originalname, 
        path: publicUrlData.publicUrl,
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

    const fileNameOnline = file.path.split("/")[-1]; 
    console.log(fileNameOnline);

    res.render("fileDetail", {
        file: file
    })
}
exports.postDeleteFile = async (req, res) => {
    const { id } = req.params; 
    const file = await db.getFileById(id)

    const fileNameOnline = file.path.split("/")[file.path.split("/").length-1]; 
    await db.deleteFileById(id)
        .then(async () => {
            const { data, error} = await supabase
                .storage
                .from("Files")
                .remove([`public/${fileNameOnline}`])
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