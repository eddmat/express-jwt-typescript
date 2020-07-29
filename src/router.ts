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
const secret = process.env.SECRET_KEY;
const protectedRouter = withJWTAuthMiddleware(router, secret);

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
protectedRouter.post("/movies", moviesController.create);
protectedRouter.get("/movies", moviesController.getAll);
protectedRouter.get("/movies/:genre/:sortBy", moviesController.getAllBy);

/**
 * Routes to Tv Shows
 */
protectedRouter.get(
  "/tvshow/:showId/episode/:epId",
  tvShowsController.getEpisode
);

export = router;
