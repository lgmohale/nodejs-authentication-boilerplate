const Sequelize = require('sequelize');
module.exports = new Sequelize('DB name' , 'postgres' , 'Password',{
    host: 'localhost',
    dialect: 'postgres',
    define: {
        "createdAt": "createdat",
        "updatedAt": "updatedat"
      } ,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
})