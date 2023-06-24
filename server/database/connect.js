require('dotenv').config(); // Load environment variables from .env file
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const createTables=()=>{
  const createSQL=[
    'CREATE TABLE IF NOT EXISTS employee (`eid` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `email` varchar(30) NOT NULL,\
    `password` varchar(200) NOT NULL, `Name` varchar(30) NOT NULL, `Dob` varchar(15) NOT NULL, `Gender` varchar(10) NOT NULL, \
    `Image` longblob, `Contact_no` bigint NOT NULL, `Designation` varchar(20) NOT NULL, \
    `project_manager` tinyint(1) NOT NULL DEFAULT "0");',

    'CREATE TABLE IF NOT EXISTS `project` (`project_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `project_name` varchar(255) NOT NULL, `creator_id` int DEFAULT NULL,\
    `Completed` tinyint(1) NOT NULL DEFAULT "0");',

  'CREATE TABLE IF NOT EXISTS `module` (`module_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` varchar(30) NOT NULL, `est_Time` time NOT NULL,\
  `Completed_Time` time DEFAULT "00:00:00", `Completed` tinyint(1) NOT NULL DEFAULT "0", `project_id` int NOT NULL, \
   FOREIGN KEY (`project_id`) REFERENCES `project`(`project_id`) ON DELETE CASCADE ON UPDATE RESTRICT);',

  'CREATE TABLE IF NOT EXISTS `otp` (`email` varchar(25) NOT NULL, `code` int NOT NULL, `expiry` bigint NOT NULL);',

  'CREATE TABLE IF NOT EXISTS `project_employee` (`project_id` int NOT NULL, `employee_id` int NOT NULL,\
  PRIMARY KEY (`project_id`, `employee_id`),\
   FOREIGN KEY (`project_id`) REFERENCES `project`(`project_id`) ON DELETE CASCADE ON UPDATE RESTRICT,\
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`eid`));'
  ]
  
  createSQL.forEach((sql)=>{
    con.query(sql, (err, result) => {
      if (err) throw err;
      //console.log('Tables created successfully!');
      //alterTables();
    });
  })
}

createTables();

module.exports=con;