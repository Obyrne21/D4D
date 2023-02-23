DROP TABLE IF EXISTS t_personnel CASCADE;
CREATE TABLE IF NOT EXISTS t_personnel (
  pers_id int NOT NULL /*AUTO_INCREMENT*/,
  pers_first_name varchar(45) DEFAULT NULL,
  pers_last_name varchar(45) DEFAULT NULL,
  pers_military_id varchar(45) DEFAULT NULL,
  pers_rank varchar(45) DEFAULT NULL,
  pers_available int DEFAULT NULL,
  pers_location varchar(45) DEFAULT NULL,
  pers_unit varchar(45) DEFAULT NULL,
  pers_comm_off_id int DEFAULT NULL,
  PRIMARY KEY (pers_id)
);

/* DROP TABLE IF EXISTS t_personnel CASCADE;
CREATE TABLE IF NOT EXISTS t_personnel (
  pers_id int NOT NULL AUTO_INCREMENT,
  pers_first_name varchar(45) DEFAULT NULL,
  pers_last_name varchar(45) DEFAULT NULL,
  pers_military_id varchar(45) DEFAULT NULL,
  pers_rank varchar(45) DEFAULT NULL,
  pers_available int DEFAULT NULL,
  pers_location varchar(45) DEFAULT NULL,
  pers_unit varchar(45) DEFAULT NULL,
  pers_comm_off_id int DEFAULT NULL,
  PRIMARY KEY (pers_id)
); */
/*
CREATE TABLE D4DDB.`t_competency_model` (
  `comp_model_id` int NOT NULL AUTO_INCREMENT,
  `comp_model_name` varchar(45) DEFAULT NULL,
  `comp_model_desc` varchar(180) DEFAULT NULL,
  PRIMARY KEY (`comp_model_id`)
);

CREATE TABLE D4DDB.`t_competency` (
  `comp_id` int NOT NULL AUTO_INCREMENT,
  `comp_name` varchar(45) DEFAULT NULL,
  `comp_desc` varchar(180) DEFAULT NULL,
  PRIMARY KEY (`comp_id`)
);

CREATE TABLE D4DDB.`t_sub_competency` (
  `sub_comp_id` int NOT NULL AUTO_INCREMENT,
  `sub_comp_name` varchar(45) DEFAULT NULL,
  `sub_comp_desc` varchar(180) DEFAULT NULL,
  PRIMARY KEY (`sub_comp_id`)
);

CREATE TABLE D4DDB.`t_prof_level` (
  `prof_level_id` int NOT NULL AUTO_INCREMENT,
  `prof_level` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`prof_level_id`)
);

CREATE TABLE D4DDB.`t_comp_map` (
  `comp_map_id` int NOT NULL AUTO_INCREMENT,
  `comp_model_id` int DEFAULT NULL,
  `comp_id` int DEFAULT NULL,
  `sub_comp_id` int DEFAULT NULL,
  `prof_level_id` int DEFAULT NULL,
  `behavior` varchar(180) DEFAULT NULL,
  PRIMARY KEY (`comp_map_id`)
) 

CREATE TABLE D4DDB.`t_comp_map` (
  `comp_map_id` int NOT NULL AUTO_INCREMENT,
  `comp_model_id` int DEFAULT NULL,
  `comp_id` int DEFAULT NULL,
  `sub_comp_id` int DEFAULT NULL,
  `prof_level_id` int DEFAULT NULL,
  `behavior` varchar(180) DEFAULT NULL,
  PRIMARY KEY (`comp_map_id`)
) 

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `d4ddb`.`v_pers` AS select
`tp`.`pers_id` AS `pers_id`,`tp`.`pers_first_name` AS `pers_first_name`,`tp`.`pers_last_name` AS
`pers_last_name`,`tp`.`pers_military_id` AS `pers_military_id`,`tp`.`pers_rank` AS
`pers_rank`,(case when (`tp`.`pers_available` = 0) then 'Unavailable' when (`tp`.`pers_available` = 1)
then 'Available' end) AS `available`,`tp`.`pers_location` AS `pers_location`,`tp`.`pers_unit` AS
`pers_unit`,`tp2`.`pers_last_name` AS `Comm_Officer` from (`d4ddb`.`t_personnel` `tp` left join `d4ddb`.`t_personnel` `tp2`
on((`tp`.`pers_comm_off_id` = `tp2`.`pers_id`)));

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `d4ddb`.`v_pers_comp` 
AS select `d4ddb`.`p`.`pers_first_name` AS `pers_first_name`,`d4ddb`.`p`.`pers_last_name` 
AS `pers_last_name`,`d4ddb`.`p`.`pers_military_id` AS `pers_military_id`,`d4ddb`.`p`.`pers_rank` 
AS `pers_rank`,`d4ddb`.`p`.`available` AS `available`,`d4ddb`.`p`.`pers_location` AS `pers_location`,`d4ddb`.`p`.`pers_unit` 
AS `Pers_unit`,`d4ddb`.`p`.`Comm_Officer` AS `comm_officer`,`cm`.`comp_model_name` AS `comp_model_name`,`c`.`comp_name` 
AS `comp_name`,`sc`.`sub_comp_name` AS `sub_comp_name`,`pl`.`prof_level` AS `prof_level`,(case when (`pcm`.`stat` = 0) 
then 'Pending' when (`pcm`.`stat` = 1) then 'Active' end) AS `Status` from (((((`d4ddb`.`v_pers` `p` join `d4ddb`.`t_pers_comp_map` `pcm` 
on((`d4ddb`.`p`.`pers_id` = `pcm`.`pers_id`))) join `d4ddb`.`t_competency_model` `cm` on((`pcm`.`comp_model_id` = `cm`.`comp_model_id`))) 
join `d4ddb`.`t_competency` `c` on((`pcm`.`comp_id` = `c`.`comp_id`))) join `d4ddb`.`t_sub_competency` `sc` 
on((`pcm`.`sub_comp_id` = `sc`.`sub_comp_id`))) join `d4ddb`.`t_prof_level` `pl` on((`pcm`.`prof_level_id` = `pl`.`prof_level_id`)));
*/