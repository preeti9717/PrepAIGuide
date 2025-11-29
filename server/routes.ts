import type { Express } from "express";
import { createServer, type Server } from "http";
import passport from "passport";
import { users } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Google OAuth routes
  app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/app");
    }
  );

  // Auth API routes
  app.get("/api/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      const user = users.get((req.user as any)?.id);
      res.json(user);
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });

  app.get("/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.redirect("/");
    });
  });

  return httpServer;
}
