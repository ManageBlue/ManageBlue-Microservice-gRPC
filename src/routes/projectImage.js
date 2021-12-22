const router = require("express").Router();
//const authJWT = require("../middlewares/authJWT");
const projectsController = require("../controllers/projectImage");


module.exports = projectsRouter => {

    projectsRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // Return project by ID
    router.get("/:id", projectsController.returnByID);

    projectsRouter.use('/api/v1/projectImage', router);
};
