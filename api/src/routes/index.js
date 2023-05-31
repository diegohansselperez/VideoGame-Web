const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerGames = require('./routeVideogames');
const routeGenres = require("./routeGenders")
const routePlatforms = require("./routePlatforms")

const router = Router();

//ruta especifica para hacer peticiones HTTP de videojuegos.
router.use("/videogames", routerGames)

//ruta especifica para los generos de videojuegos.
router.use("/genres", routeGenres)

router.use("/platforms", routePlatforms)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
