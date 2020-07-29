import { Router } from "express";
import { withJWTAuthMiddleware } from "express-kun";
import * as usersController from "./controllers/users";
import * as moviesController from "./controllers/movies";
import * as tvShowsController from "./controllers/tvshows";

const router = Router();

const protectedRouter = withJWTAuthMiddleware(router, "secretKey");

router.post("/", usersController.create);
router.post("/login", usersController.login);

protectedRouter.post("/movies", moviesController.getAll);
protectedRouter.get("/movies", moviesController.getAll);
protectedRouter.get("/movies/:genre/:sortBy", moviesController.getAllBy);
protectedRouter.get("/tvshow/:showId/episode/:epId", tvShowsController.getAll);

export = router;
