import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        if (!email) {
          return done(null, false);
        }

        const googleId = profile.id;

        const name =
          profile.displayName ||
          `${profile.name?.givenName || ""} ${
            profile.name?.familyName || ""
          }`.trim();

        const avatar =
          profile.photos?.[0]?.value || "";

        // ==========================
        // FIND BY GOOGLE ID
        // ==========================

        let user = await User.findOne({ googleId });

        if (user) {
          if (user.isBlocked) {
            return done(null, false, {
              message: "Your account has been blocked by admin.",
            });
          }

          return done(null, user);
        }

        // ==========================
        // FIND BY EMAIL
        // ==========================

        user = await User.findOne({ email });

        if (user) {
          if (user.isBlocked) {
            return done(null, false, {
              message: "Your account has been blocked by admin.",
            });
          }

          // Link existing account with Google
          user.googleId = googleId;
          user.authProvider = "google";

          if (!user.avatar) {
            user.avatar = avatar;
          }

          await user.save();

          return done(null, user);
        }

        // ==========================
        // CREATE NEW GOOGLE USER
        // ==========================

        user = await User.create({
          name,
          email,
          googleId,
          avatar,
          authProvider: "google",
          password: undefined,
        });

        return done(null, user);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;