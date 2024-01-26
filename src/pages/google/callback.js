import { setCookies } from "cookies-next";
import passport from "passport";
import jwt from 'jsonwebtoken';
import "../../../lib/passport"

export default async function (req, res, next) {
  passport.authenticate("google", async (err, user, info) => {
    if (err || !user) {
      return res.redirect("http://localhost:3000/?a=auth_fail");
    }

    try {
      const secretKey = process.env.JWT_SECRET;

      const token = await jwt.sign({
        email: user.email,
        name: user.name,
        accessToken: user.accessToken,
      },
      secretKey
      );

      setCookies("token", token, {
        req, res,
      });

      res.redirect("http://localhost:3000");
    } catch(err) {
      console.error(err);
      res.redirect("http://localhost:3000/?a=auth_fail");
    }
    // set cookie and send redirect

  })(req, res, next);
}
