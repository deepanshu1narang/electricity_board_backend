'use strict';

/** @type {import('sequelize-cli').Migration} */
const moment = require('moment-timezone');
function parseDateStringToDate(dateString) {
  const inputDate = moment(dateString, 'DD/MM/YYYY');
  let utcDate = (inputDate.tz('UTC')).toISOString();
  return utcDate;
}
const UserData = require('../data/users.json')
module.exports = {
  async up (queryInterface, Sequelize) {
   let users = []
   console.log('step1 ', UserData.length);
    await queryInterface.bulkDelete('Users', users, {});
    for(let i=0; i< UserData.length; i++){
      let userData = UserData[i];
      userData.Date_of_Application =  parseDateStringToDate(userData.Date_of_Application);
      userData.Date_of_Approval =  parseDateStringToDate(userData.Date_of_Approval);
      userData.Modified_Date =  parseDateStringToDate(userData.Modified_Date);
      userData.createdAt = new Date();
      userData.updatedAt = new Date();
      users.push(userData);
    }
    console.log('working fine her',users[0]);
      await queryInterface.bulkInsert('Users', users, {});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
