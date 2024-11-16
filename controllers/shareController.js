const db = require("../prisma/queries");

exports.getSharedFolderById = async (req, res) => {
    const { shareId } = req.params;  
    const folder = await db.getFolderByShareId(shareId); 
    if (folder) {
        const path = await db.getFolderPath(parseInt(folder.id))
        folder.folderPath = path;  
        console.log(folder); 
        return res.render("folder", {
            folder: folder,
            allowDelete: false
        });  
    } else {
        return res.sendStatus(403);
    }
}