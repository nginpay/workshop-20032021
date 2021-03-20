module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    function verifyJWT(req, res, next){
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
          if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
          
          // se tudo estiver ok, salva no request para uso posterior
          req.userId = decoded.id;
          next();
        });
    }
    

    const router = require("express").Router();

     // Create a new Tutorial
    router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all Tutorials
    router.get("/:id", tutorials.findOne);

    // Retrieve all Tutorials
    router.put("/:id", verifyJWT, tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", verifyJWT, tutorials.delete);

    //Login
    router.post('/login', tutorials.login);

  app.use('/api/tutorials', router);
};