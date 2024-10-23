const {PrismaClient} = require("@prisma/client"); 
const prisma = new PrismaClient(); 

exports.getUserByEmail = async(email) => {
    return await prisma.user.findFirst({
        where: {
            email: email
        }
    })
}
exports.getUserById = async(id) => {
    return await prisma.user.findFirst({
        where: {
            id: parseInt(id)
        }
    })
}

exports.createUser = async (user) => {
    return await prisma.user.upsert({
        create: {
            email: user.email,
            password: user.password,
        }, 
        update: {},
        where: {email: user.email}
    });
}


exports.updateUser = async(user) => {
    return await prisma.user.update({
        where: {id: user.id},
        data: {
            updatedAt: new Date()
        }
    })
}

exports.createFolder = async (folder, user) => {
    return await prisma.folder.upsert({
        create: {
            user: {
                connect: {id: user.id}
            },
            name: folder.name, 
            parentFolder: folder?.parentId ? {
                connect: {
                    id: parseInt(folder.parentId)
                } 
            } : undefined,
        },
        update: {},
        where: {id: folder.id || 0 }
    })
}

exports.updateFolder = async (folder) => {
    return await prisma.folder.update({
        where: {id: folder.id},
        data: {
            name: folder.name
        }
    })
}

exports.deleteFolder = async (id) => {
    return await prisma.folder.delete({
        where: {
            id: parseInt(id)
        },
        include: {
            parentFolder: true,
            file: true,
        }
    })
}

exports.allUserFolders = async(userid) => {
    return await prisma.folder.findMany({
        where: {
            userId: userid
        }
    })
}

exports.allUsersFoldersStructure = async (userid)=> {
    return await prisma.folder.findMany({
        where: {
            userId: userid,
        }, 
        include: {
            subfolder: true
        }
    })
}

exports.getFolderById = async (id) => {
    return await prisma.folder.findFirst({
        where: {
            id: parseInt(id)
        },
        include: {
            subfolder: true,
            file: true
        }
    })
}

exports.deleteUser = async (id) => {
    return await prisma.user.delete({
        where: {
            id: id
        },
        include: {
            folder: true,
            file: true,
        }
    })
}

exports.createFile = async (fileData) => {
    const file =  await prisma.file.create({
        data: {
            name: fileData.name,
            path: fileData.path,
            size: fileData.size,
            user: {
                connect: {id: parseInt(fileData.userId)}
            },
            folder: {
                connect: {id: parseInt(fileData.folderId)}
            }
        }
    })

    return file; 
}


exports.getFileById = async (id) => {
    return await prisma.file.findFirst({
        where: {
            id: parseInt(id)
        },
        include: {
            folder: true,
            user: true
        }
    })
}

exports.deleteFileById = async (id) => {
    return await prisma.file.delete({
        where: {
            id: parseInt(id)
        }
    })
}

