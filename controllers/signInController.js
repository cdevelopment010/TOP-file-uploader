const db = require("../prisma/queries");
const { body, validationResult } = require("express-validator"); 
const passport = require("passport");

const userValidation = [
    body("email")
        .isEmail().withMessage("Email must be of type email")
        .isLength({ min: 3 }).withMessage("Email must be at least 3 characters")
]

exports.getSignIn = async (req, res) => {
    if (req.user) {
        //user already signed in redirect to home
        return res.redirect("/");
    }

    return res.render("signInForm");
}


exports.postSignIn = [
    userValidation,
    async (req, res, next) => {
        const user = { email: req.body.email}

        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            return res.status(400).render("signInForm", {
                errors: errors.array(), 
                user: user
            })
        }

        passport.authenticate("local", (err, user, info) => {
            if (err) { 
                return next(err);
            }
            if (!user) {
                let errors = [{msg: info.message}]
                return res.status(400).render("signInForm", {
                    errors: errors,
                })
            }

            req.logIn(user, async (err) => {
                if (err) {
                    return next(err);
                }

                await db.updateUser(user)
                    .then(() => {
                        return res.redirect("/");
                    })
                    .catch(err => {
                        return next(err);
                    })
            })

        })(req, res, next);

    }

]