const { getUserDetailsFromDB , getUserListFromDB, editUserDetailsFromDB, getDashboardDataFromDB } = require('../Services/userService')

const getUserDetailsById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, msg: 'User ID is missing' });
    }
    const { statusCode, response } = await getUserDetailsFromDB(id);
    return res.status(statusCode).send(response);
}

const getUserList = async (req, res) => {
    let pageSize = req.query.pSize ? Number(req.query.pSize) : 10;
    let start = req.query.page ? pageSize * (Number(req.query.page) - 1) : 0;
    let query = null;
    if(req.query.datemin && req.query.datemax){
        query ={
            datemin: decodeURIComponent(req.query.datemin),
            datemax: decodeURIComponent(req.query.datemax)
        }
    }
   
    const { statusCode, response } = await getUserListFromDB(pageSize,start, query);
    return res.status(statusCode).send(response);
}

const editUserDetails = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: true, msg: 'data is missing' });
    }
    const { statusCode, response } = await editUserDetailsFromDB(req.body);
    return res.status(statusCode).send(response);
}

const getDashboardData = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: true, msg: 'date range is missing' });
    }
    const { statusCode, response } = await getDashboardDataFromDB(req.body);
    return res.status(statusCode).send(response);
}

module.exports = {
    getUserDetailsById,
    getUserList,
    editUserDetails,
    getDashboardData
}