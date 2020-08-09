import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import { getJoin, logout, postJoin, getLogin, postLogin, githubLogin, githubLoginCallback, getMe, facebookLogin,  } from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.githubLogin, githubLogin);
globalRouter.get(routes.githubCallback, 
    passport.authenticate('github', {
        failureRedirect : routes.login,
        successRedirect : routes.home
    })
);
globalRouter.get(routes.me, getMe)
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, passport.authenticate("facebook", 
{ successRedirect: routes.home,
failureRedirect: routes.login}))

export default globalRouter;
