import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  picture?: string;
}

const users: Map<string, UserProfile> = new Map();

export function initializeAuth() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        const userProfile: UserProfile = {
          id: profile.id,
          displayName: profile.displayName || "",
          email: profile.emails?.[0]?.value || "",
          picture: profile.photos?.[0]?.value,
        };

        users.set(profile.id, userProfile);
        return done(null, userProfile);
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    const user = users.get(id);
    done(null, user || null);
  });
}

export { users };
