
const db = require('../sequelize/models')
const {Op} = require('sequelize');
const getUserDetailsFromDB = async (id) => {
    try {

        if (Number.isInteger(id)) {
            return {
                statusCode: 400,
                response: { msg: `User Id must be in integer`, error: true }
            }
        }
        const dbData = await db.User.findByPk(Number(id));
        console.log('dbData is', dbData);
        if (!dbData) {
            return {
                statusCode: 400,
                response: { msg: `No User found with this User Id ${id} `, error: true }
            }

        }
        return {
            statusCode: 200,
            response: { data: dbData, error: false }
        }

    }
    catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}

const editUserDetailsFromDB = async (body) => {
    try {
        console.log('body is ', body);
        // if(body.Date_of_Application) body.Date_of_Application = new Date(body.Date_of_Application);
        // if(body.Date_of_Approval) body.Date_of_Approval = new Date(body.Date_of_Approval);
        // if(body.Modified_Date) body.Modified_Date = new Date(body.Modified_Date);
        console.log(body);
        const AccountUtils = require('../Utils/AccountUtils')
        const { error } = AccountUtils.ValidateUserSchema({ ...body });
        if (error) {
            return { response: { msg: error.details[0].message, error: true }, statusCode: 400 };
        }
        const ID = body.ID;
        delete body.ID;
        if(body.Date_of_Application) delete body.Date_of_Application;
        if(body.GovtID_Type) delete body.GovtID_Type;
        if(body.ID_Number) delete body.ID_Number;
        const dbData = await db.User.findByPk(Number(ID));
        if (!dbData) {
            return {
                statusCode: 400,
                response: { msg: `No User found with this User Id ${id} `, error: true }
            }

        }
        await db.User.update(body, {
            where: {
                ID: ID
            }
        });
        return {
            statusCode: 200,
            response: { msg: 'User data upated successfully', error: false }
        }

    }
    catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}

const getUserListFromDB = async (pageSize, start,query) => {
    try {
        console.log('coming over here with id ', query);
        const dbQuery = {}
        if(query){
            const firstDate = new Date(query.datemin);
            const lastDate = new Date( query.datemax);
            console.log('firstDate is ', firstDate);
            dbQuery.Date_of_Application= {
                [Op.between]: [firstDate, lastDate],
            }
               
        }
        console.log('dbQuery query is ', dbQuery);
        const dbData = await db.User.findAll({
            where: {
               ...dbQuery
            },
            order: [['createdAt', 'ASC']],
            offset: start,
            limit: pageSize,
            attributes: ['ID', 'Applicant_Name', 'Reviewer_Name', 'Date_of_Application', 'Status'],

        });
        const totalCount = await db.User.count({where : {...dbQuery}});
        //console.log('dbData is', dbData);
        if (!dbData) {
            return {
                statusCode: 400,
                response: { msg: `No Record found for the query`, error: true }
            }

        }
        return {
            statusCode: 200,
            response: { data: dbData, totalCount, currentCount: dbData.length, error: false }
        }

    }
    catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}

const getDashboardDataFromDB = async (body) => {
    try {
        let {startMonth, startYear, endMonth, endYear, status} = body;
       let firstDate = new Date(startYear,startMonth , 1)
       let lastDate = new Date(endYear,endMonth+1 , 0)
       console.log('body is ', body);
       console.log('date range is ', firstDate, lastDate);
        const dbData = await db.User.findAll({
            attributes: [
                [db.sequelize.fn('count', db.sequelize.col('*')), 'count'],
              ],
            where: {
                Date_of_Application: {
                    [Op.between]: [firstDate, lastDate],
                   
                  },
                Status : status || 'Pending',
            },
            group: [db.sequelize.fn('date_trunc', 'month', db.sequelize.col('Date_of_Application'))],
            raw: true,
        });
        // const totalCount = await db.User.count();
        dbData.label = status;
        console.log('dbData is', dbData);
        if (!dbData) {
            return {
                statusCode: 400,
                response: { msg: `No Record found for the query`, error: true }
            }

        }
        return {
            statusCode: 200,
            response: { label:status, data: dbData, currentCount: dbData.length, error: false }
        }

    }
    catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}
module.exports = {
    getUserDetailsFromDB,
    getUserListFromDB,
    editUserDetailsFromDB,
    getDashboardDataFromDB
}