/*const mongoose = require('mongoose');
const ProjectImage = mongoose.model('Project-Image');
const axios = require("axios");

const config = require('../config/config')


// Return project with requested id
exports.returnByID = (req, res) => {

    ProjectImage.find({project: req.params.id})
        .then(projectImage => {

            if (projectImage.length === 0) {

                // make api call and save
                let newProjectImage = new ProjectImage({
                    imageUrl: 'https://previews.123rf.com/images/lucadp/lucadp1111/lucadp111100148/11505663-the-word-project-placed-over-a-plan-project-3d-render-.jpg',
                    project: req.params.id
                });

                if (req.query.searchTerm) {

                    axios.get("https://api.bing.microsoft.com/v7.0/images/search?q=" + encodeURIComponent(req.query.searchTerm), {
                        headers: {
                            'Ocp-Apim-Subscription-Key': config.bingApiKey
                        }
                    })
                        .then(response => {
                            newProjectImage.imageUrl = response.data.value[0].contentUrl
                        })
                        .finally(() => {

                            // Save new Project in the database
                            newProjectImage
                                .save(newProjectImage)
                                .then(data => {
                                    res.send(data);
                                })
                                .catch(error => {
                                    res.status(500).send({
                                        message: error.message || "An error occurred while creating a new project image!"
                                    });
                                });
                        })
                } else {
                    // Save new Project in the database
                    newProjectImage
                        .save(newProjectImage)
                        .then(data => {
                            res.send(data);
                        })
                        .catch(error => {
                            res.status(500).send({
                                message: error.message || "An error occurred while creating a new project image!"
                            });
                        });
                }


            } else {

                res.status(200).json(projectImage);
            }

        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "An error occurred while fetching project image!"
            });
        });
};
*/