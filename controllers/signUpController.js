const {body, validationResult} = require("express-validator"); 
const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");

const userValidation = [
    body("email")
        .isEmail().withMessage("Email must be a valid email")
        .isLength({min: 3}).withMessage("Email must be at least 3 characters long")
        .custom(async value => {
            const user = await db.getUserByEmail(value); 
            if (user) {
                throw new Error("This email is already in use")
            }
        }), 
    body("password")
        .isStrongPassword({
            minLength: 8
        }).withMessage("Password must contain at least 8 character, 1 lower case letter, 1 upper case letter, 1 number and 1 symbol")
        .isLength({min: 3}).withMessage("Password must be at least 3 characters"),
    body("confirmPassword").custom((value, { req}) => {
        return value == req.body.password;
    }).withMessage("Passwords must match")
]

exports.getSignUp = async (req, res) => {
    return res.render("signUpForm");
}

exports.postSignUp = [
    userValidation,
    async (req, res, next) => {
        const user = {
            email: req.body.email
        }

        const errors = validationResult(req); 

        if (!errors.isEmpty()) {
            return res.status(400).render("signUpForm", {
                user: user,
                errors: errors.array()
            })
        }

        bcrypt.hash(req.body.password, 10, async(err, hashedPassword)=> {
            if (err) {
                return next(err);
            }

            user.password = hashedPassword;
            await db.createUser(user)
                .then((user) => {
                    req.login(user, (err)=> {
                        if (err) { return next(err)}
                        return res.redirect("/");
                    })
                }).catch(err => {
                    const errors = [{msg: err.detail, code: err.code}]
                    return res.status(400).render("signUpForm", {
                        user: user,
                        errors: errors
                    })
                })
        })
    }
]