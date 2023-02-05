// const express = require('express');
// const expressValidators = require('express-validators');
const {checkSchema, validationResult} = require('express-validator');

const validateMessage = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }

const registerUser = async (req,res,next) => {
    console.log("req.query"+JSON.stringify(req.query,0,5));
    console.log("------------------ Inside regsiterUser Validation ----------------------------");
    await checkSchema({
        // 'skip': {
        //     isEmpty: true,
        //     errorMessage: "Skip is mandatory field",
        //     isInt: true,
        //     errorMessage: "Skip value should be a positive number",
        //     withMessage: "Skip value should be a positive number",
        //     isLength: {
        //         options: { 
        //             min:1,
        //             max:25,
        //         },                
        //         errorMessage: "Skip value should be in range 0 to 25"
        //     }
        // },
        password: {
            isLength: {
              errorMessage: 'Password should be at least 7 chars long',
              // Multiple options would be expressed as an array
              options: { min: 7 },
            },
        },
        // 'limit': {
        //     optional: true,
        //     isInt: true,
        //     errorMessage: "Skip value should be a positive number",
        //     withMessage: "Skip value should be a positive number",
        //     isLength: {
        //         options: { 
        //             min:0,
        //             max:25,
        //         },                
        //         errorMessage: "Skip value should be in range 0 to 25"
        //     }
        // }
    }), validateMessage(req,res,next)
    // ['query']).run(req)
    next();
};

module.exports = {
    registerUser,
}