const Joi = require("joi");

const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body
    const errors = [];

    if (title == null) {
        errors.push({field: 'title', message: 'This field is required'});
    } else if (title.length >= 255) {
        errors.push({field: 'title', message: 'This field should contain less than 255 characters'});
    }
    if (director == null) {
        errors.push({field: 'director', message: 'This field is required'});
    } else if (director.length >= 255) {
        errors.push({field: 'director', message: 'This field should contain less than 255 characters'});
    }
    if (year == null) {
        errors.push({field: 'year', message: 'This field is required'});
    } else if (year.length >= 255) {
        errors.push({field: 'year', message: 'This field should contain less than 255 characters'});
    }
    if (color == null) {
        errors.push({field: 'color', message: 'This field is required'});
    } else if (color.length >= 255) {
        errors.push({field: 'color', message: 'This field should contain less than 255 characters'});
    }
    if (duration == null) {
        errors.push({field: 'duration', message: 'This field is required'});
    }
    if (errors.length) {
        res.status(422).json({validationErrors: errors});
    }
    else {
        next();
    }
  };

  const userSchema = Joi.object({
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
  });

  const validateUser = (req, res, next) => {
    const { firstname, lastname, email } = req.body;
    const { error } = userSchema.validate(
        { firstname, lastname, email },
        { abortEarly: false }
    );
    
    if (error) {
        res.status(422).json({ validationErrors: error.details });
    } else {
        next();
    }
};


  module.exports = {
    validateMovie,
    validateUser,
  };
