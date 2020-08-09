import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { restart } from "nodemon";


export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"})
};

export const postJoin = async (req, res, next) => {
    const{
        body :{ name, email, password, password2}
    } = req;
    if(password !== password2){
        req.flash('error', 'Password dont match')
        res.status(400);
        res.render("join", { pageTitle:"Join"});
    } else {
        try{
            const user = await User({
                name,
                email,
            });
            await User.register(user, password);
            next();
        }
        catch(error){
            console.log(error);
            res.redirect(routes.home)
        }
    }
}
export const getLogin = (req, res) => res.render("login", {pageTitle : "Log In"});

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
    successFlash: 'Welcome',
    failureFlash: "Cant log in / Check Email or Password",
});

export const githubLogin = passport.authenticate('github',{
    successFlash: 'Welcome',
    failureFlash: "Cant log in / Check Email or Password",
});

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    const { _json: {id, avatar_url, name, email} } = profile; 
    try{
        const user = await User.findOne({email});
        if(user){
            user.githubID = id;
            user.avatarUrl = avatar_url;
            user.name = name;
            user.save();
            return cb(null, user);
        }
        else{
            const newUser = await User.create({
                email,
                name,
                githubID:id,
                avatarUrl : avatar_url,
            });
            return cb(null, newUser);
        }
    }
    catch(error){
        return cb(error);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook", {
    successFlash: 'Welcome',
    failureFlash: "Cant log in / Check Email or Password",
});

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb);
}

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home)
}

export const logout = (req, res) => {
    req.flash("info", "Logged out, see you later")
    req.logout();
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", {pageTitle : "User Detail", user: req.user});
};

export const users = (req, res) => res.render("users", {pageTitle : "Users"});
export const userDetail = async(req, res) => {
    const {params:{id}} = req;
    try{
        const user = await User.findById(id).populate("videos");
        console.log(user);
        res.render("userDetail", {pageTitle : "User Detail", user});
    }catch(error){
        req.flash("error", "User not found");
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => {
    res.render("editProfile", {pageTitle : "Edit Profile"})
};

export const postEditProfile = async(req, res) => {
    const{
        body:{name, email},
        file
    } = req;
    try{
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        req.flash("success", "Profile updated");
        res.redirect(routes.me);
    }catch(error){
        req.flash("error", "Cant update profile")
        res.redirect(editProfile)
    }
};

export const getChangePassword = (req, res) => {
    res.render("changePassword",{pageTitle : "Change Password"})
};

export const postChangePassword = async (req, res) => {
    const{
        body : {
            currentPassword,
            newPassword,
            verifyNewPassword,
        }
    } = req;
        try{
            if(newPassword !== verifyNewPassword){
                req.flash("error", "Password don't match");
                res.status(400);
                res.redirect(routes.changePassword);
                return
            }else {
                await req.user.changePassword(currentPassword, newPassword);
                res.redirect(routes.me);
            }
        }
        catch(error){
            req.flash("error", "Cant change Password");
            res.status(400);
            console.log(error);
            res.render(routes.changePassword)
        }
};