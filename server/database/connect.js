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
    'CREATE TABLE IF NOT EXISTS employee (`eid` int NOT NULL, `email` varchar(30) NOT NULL,`password` varchar(200) NOT NULL,\
  `Name` varchar(30) NOT NULL, `Dob` varchar(15) NOT NULL, `Gender` varchar(10) NOT NULL, `Image` longblob,\
  `Contact_no` bigint NOT NULL, `Designation` varchar(20) NOT NULL, `project_manager` tinyint(1) NOT NULL DEFAULT "0");',
  'CREATE TABLE IF NOT EXISTS `module` (`module_id` int NOT NULL, `name` varchar(30) NOT NULL, `est_Time` time NOT NULL,\
  `Completed_Time` time DEFAULT "00:00:00", `Completed` tinyint(1) NOT NULL DEFAULT "0", `project_id` int NOT NULL);',
  'CREATE TABLE IF NOT EXISTS `otp` (`email` varchar(25) NOT NULL, `code` int NOT NULL, `expiry` bigint NOT NULL);',
  'CREATE TABLE IF NOT EXISTS `project` (`project_id` int NOT NULL, `project_name` varchar(255) NOT NULL, `creator_id` int DEFAULT NULL,\
    `Completed` tinyint(1) NOT NULL DEFAULT "0");',
  'CREATE TABLE IF NOT EXISTS `project_employee` (`project_id` int NOT NULL, `employee_id` int NOT NULL);'
  ]
  
  createSQL.forEach((sql)=>{
    con.query(sql, (err, result) => {
      if (err) throw err;
      //console.log('Tables created successfully!');
      //alterTables();
    });
  })
}

const alterTables=()=>{
  const alterSQL=[
  'ALTER TABLE `employee` ADD PRIMARY KEY (`eid`);',
  'ALTER TABLE `module` ADD PRIMARY KEY (`module_id`), ADD KEY `module_ibfk_1` (`project_id`);',
  'ALTER TABLE `project` ADD PRIMARY KEY (`project_id`), ADD KEY `creator_id` (`creator_id`);',
  'ALTER TABLE `project_employee` ADD PRIMARY KEY (`project_id`,`employee_id`), ADD KEY `employee_id` (`employee_id`);',
  'ALTER TABLE `employee` MODIFY `eid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;',
  'ALTER TABLE `module` MODIFY `module_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;',
  'ALTER TABLE `project` MODIFY `project_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;',
  'ALTER TABLE `module` ADD CONSTRAINT `module_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE RESTRICT;',
  'ALTER TABLE `project` ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `employee` (`eid`);',
  'ALTER TABLE `project_employee` ADD CONSTRAINT `project_employee_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE RESTRICT,\
  ADD CONSTRAINT `project_employee_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`eid`);'
  ]

  alterSQL.forEach((sql)=>{
    con.query(sql, (err, result) => {
      if (err) throw err;
      //console.log('Alter table statements executed successfully!');
    });
  })
  
}

createTables();
alterTables();


module.exports=con;