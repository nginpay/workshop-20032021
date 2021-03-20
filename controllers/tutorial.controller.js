const db = require('../models');
const Tutorial = db.tutorials;
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
//create and save a new tutorial
exports.create = (req, res) => {
    //Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Title can not be empty!" });
        return;
    }

    //Create a tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published: false
    });

    // Save tutorial in the database
    tutorial 
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occurred while creating the tutorial"
            })
        })
}

//Retrieve all tutorials from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Tutorial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found totorial with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving totorial with id" + id
        });
      });
  };

  exports.update = (req, res) => {
      if (!req.body) {
          return res.status(400).send({
              message : "data to update can not be empty!"
          })
      }

      const id = req.params.id;

      Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
        });
    };

    exports.delete = (req, res) => {
        const id = req.params.id;
      
        Tutorial.findByIdAndRemove(id)
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
              });
            } else {
              res.send({
                message: "Tutorial was deleted successfully!"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Tutorial with id=" + id
            });
          });
      };

exports.login = (req, res) => {
    if(req.body.user === 'Tozzi' && req.body.password === '12345'){
        const id = 1;
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300
        });
        return res.json({ auth: true, token : token });
    }

    res.status(500).json({ message: "login invalido"})
}