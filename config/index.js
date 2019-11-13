 const Sequelize = require('sequelize');
module.exports = new Sequelize('loginboilerplate' , 'postgres' , 'admin123',{
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