const {body}=require("express-validator")

const registerValidator=[
    body("name")
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({min:2, max:100})
        .withMessage('Name nust be between 2 and 100 characters'),

    body('email')
         .trim()
         .isEmail()
         .withMessage('Enter a valid email')
         .normalizeEmail(),

    body('password')
        .isLength({min:6})
        .withMessage("Password must be at least 6 characters")
]

const loginValidator=[
    body('email')
        .trim()
         .isEmail()
         .withMessage('Enter a valid email')
         .normalizeEmail(),

     body('password')
         .notEmpty()
         .withMessage('Password is required')   
];

module.exports={
   registerValidator,
   loginValidator
}