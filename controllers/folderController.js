const db = require("../prisma/queries");
const uuidv4 = require("uuid").v4

exports.getFolderForm = async (req, res) => {
    if (!req.user) {
        return res.redirect("/sign-in")
    }
    const folders = await db.allUserFolders(req.user.id); 
    let action = '/folder/create';
    const folderId = req.params?.id; 
    let currentFolder; 
    if (folderId) { 
        currentFolder = await db.getFolderById(folderId);
        action = `/folder/update/${folderId}`;
    }
    return res.render("folderForm", {
        folders: folders, 
        currentFolder: currentFolder, 
        action: action,
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
exports.postUpdateFolderForm = async (req, res) => {
    const folder = {
        id: parseInt(req.params.id),
        name: req.body.name,
        parentId: req.body.parentFolder == "" ? null : parseInt(req.body.parentFolder)
    }
    await db.updateFolder(folder, req.user); 
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

exports.getShareFolderForm = async (req, res) => {
    const { id } = req.params;
    const folder = await db.getFolderById(id);
    return res.render("folderShare", {
        folder: folder,
        action: `/folder/share/${id}`
    })
}

exports.postShareFolderForm = async (req, res) => {
    const { id } = req.params;
    const shareExpire = req.body.shareExpire;  
    let expireDate = new Date().getTime(); 
    switch(shareExpire){
        case '30mins': 
            expireDate += 1000 * 60 * 30; 
            break; 
        case '1hour':
            expireDate += 1000 * 60 * 60; 
            break;
        case '12hour':
            expireDate += 1000 * 60 * 60 * 12; 
            break;
        case '1day':
            expireDate += 1000 * 60 * 60 * 24; 
            break;
        case '1week':
            expireDate += 1000 * 60 * 60 * 24 * 7; 
            break;
        case '1month':
            const tempDateMonth = new Date(expireDate); 
            tempDateMonth.setMonth(tempDateMonth.getMonth() + 1); 
            expireDate = tempDateMonth.getTime(); 
            break;
        case '1year':
            const tempDateYear = new Date(expireDate); 
            tempDateYear.setFullYear(tempDateYear.getFullYear() + 1); 
            expireDate = tempDateYear.getTime(); 
            break;
        case 'never':
            expireDate = new Date(9999, 11, 31, 23, 59, 59); 
            break;
        default:
            expireDate += 1000 * 60 * 30; //30 minute default
            break; 
            
    }
    expireDate = new Date(expireDate)
    const folderShareId = uuidv4(); 
    await db.setSharedFolderByFolderId(parseInt(id), expireDate, folderShareId);
    return res.redirect(`/folder/${id}`); 


}