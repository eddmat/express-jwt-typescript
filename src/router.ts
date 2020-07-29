import { Router } from "express";
import { withJWTAuthMiddleware } from "express-kun";
import dotenv from "dotenv";

/**
 * Import controllers
 */
import * as authController from "./controllers/auth";
import * as moviesController from "./controllers/movies";
import * as tvShowsController from "./controllers/tvshows";

dotenv.config();

const router = Router();
const secretAccess = process.env.ACCESS_JWT_SECRET;
const protectedRouter = withJWTAuthMiddleware(router, secretAccess);

/**
 * Routes to sign-up and authentication
 */
router.post("/auth/signup", authController.create);
router.post("/auth/login", authController.login);
// Refresh JWT token
router.post("/auth/refresh", authController.refresh);

/**
 * Routes to Movies
 */
protectedRouter.post("/api/movies", moviesController.create);
protectedRouter.get("/api/movies", moviesController.getAll);
protectedRouter.get("/api/movies/:genre/:sortBy", moviesController.getAllBy);

/**
 * Routes to Tv Shows and Episodes
 */
protectedRouter.get(
  "/api/tvshow/:showId/episode/:epId",
  tvShowsController.getEpisode
);

export = router;
