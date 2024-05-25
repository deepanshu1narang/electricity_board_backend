const Joi = require("joi");

/**
 *@function ValidateUserSchema: used for validation of the user Schema
 */
 const ValidateUserSchema = (user) => {
    const userSchema = Joi.object({
        ID: Joi.number().required(),
        Applicant_Name: Joi.string().required(),
        Gender: Joi.string().valid('Male', 'Female', 'Other').required(),
        District: Joi.string(),
        State: Joi.string(),
        Pincode: Joi.number(),
        Ownership: Joi.string(),
        GovtID_Type: Joi.string(),
        ID_Number: Joi.number(),
        Category: Joi.string(),
        Load_Applied:Joi.number().max(200), // as pe the condition	Load applied should not exceed 200 KV
        Date_of_Application: Joi.date().iso(),
        Date_of_Approval: Joi.date().iso(),
        Modified_Date: Joi.date().iso(),
        Status: Joi.string().valid('Approved', 'Pending', 'Connection Released', 'Rejected').required(),
        Reviewer_ID: Joi.number(),
        Reviewer_Name: Joi.string(),
        Reviewer_Comments: Joi.string(),
    });
    return userSchema.validate(user);

};

module.exports ={
    ValidateUserSchema
}