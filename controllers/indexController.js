const db = require("../prisma/queries");

exports.getHomePage = async (req, res) => {
    const user  = await db.createUser({email: 'example@exampe.com', password: 'lkasdkjas;kjasd##', updatedAt: new Date() })
    const folder = await db.createFolder({id: 1, name: 'folder1'}, user);

    
    res.send("Home page");
}