// {
//     "ID": 1,
//     "Applicant_Name": "MICHAEL",
//     "Gender": "Male",
//     "District": "North",
//     "State": "DELHI",
//     "Pincode": 110028,
//     "Ownership": "JOINT",
//     "GovtID_Type": "AADHAR",
//     "ID_Number": 6349499,
//     "Category": "Commerical",
//     "Load_Applied (in KV)": 10,
//     "Date_of_Application": "18/03/21",
//     "Date_of_Approval": "12/10/21",
//     "Modified_Date": "18/04/21",
//     "Status": "Approved",
//     "Reviewer_ID": 1460,
//     "Reviewer_Name": "HEM CHAND",
//     "Reviewer_Comments": "Installation pending"
//   }

  'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {

        }
    }
    User.init({
        ID: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        Applicant_Name: DataTypes.STRING,
        Gender: {
            type: DataTypes.ENUM,
            values: ['Male', 'Female', 'Other']
        },
        District:  {
            type: DataTypes.ENUM,
            values: ['East', 'West', 'North', 'South', 'Other']
        },
        State: DataTypes.STRING,
        Pincode: DataTypes.INTEGER,
        Ownership:DataTypes.STRING,
        Ownership:  {
            type: DataTypes.ENUM,
            values: ['JOINT', 'INDIVIDUAL']
        },
        GovtID_Type:  {
            type: DataTypes.ENUM,
            values: ['AADHAR', 'PAN', 'PASSPORT', 'VOTER_ID']
        },
        ID_Number:DataTypes.BIGINT,
        Category:  {
            type: DataTypes.ENUM,
            values: ['Commerical', 'Residential']
        },
        Load_Applied: DataTypes.INTEGER,
        Date_of_Application:DataTypes.DATE,
        Date_of_Approval:DataTypes.DATE,
        Modified_Date:DataTypes.DATE,
        Status: {
            type: DataTypes.ENUM,
            values: ['Approved', 'Pending', 'Connection Released', 'Rejected']
        },
        Reviewer_ID:DataTypes.BIGINT,
        Reviewer_Name:DataTypes.STRING,
        Reviewer_Comments :DataTypes.STRING

    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
