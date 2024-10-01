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
            id: id
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
        where: {email: user.email},
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
            parentId: folder?.parentId ? {
                connect: {
                    id: folder.parentId
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