import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import jwt from "jsonwebtoken";


passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const secretKey = process.env.JWT_SECRET;

        const token = await jwt.sign({
          email: profile.email,
          name: profile.displayName,
          accessToken,
        },
        secretKey
        );
        
        const user = {
          email: profile.email,
          name: profile.displayName,
          accessToken,
        };

        done(null, user, {message: "Auth successful", token });
      } catch (err) {
        console.error(err);
        done(err, false, { message: "Internal server error" });
      }
    }
  )
);
