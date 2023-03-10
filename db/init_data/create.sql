CREATE SCHEMA IF NOT EXISTS D4DDB;
DROP TABLE IF EXISTS D4DDB.t_personnel CASCADE;
CREATE TABLE IF NOT EXISTS D4DDB.t_personnel (
  pers_id SERIAL PRIMARY KEY,
  pers_first_name varchar(45) DEFAULT NULL,
  pers_last_name varchar(45) DEFAULT NULL,
  pers_military_id varchar(45) NOT NULL,
  pers_rank varchar(45) DEFAULT NULL,
  pers_available int DEFAULT NULL,
  pers_location varchar(45) DEFAULT NULL,
  pers_unit varchar(45) DEFAULT NULL,
  pers_comm_off_id int DEFAULT NULL
);

insert into D4DDB.t_personnel (pers_first_name,pers_last_name,pers_military_id,pers_rank,Pers_available,pers_location,pers_unit, Pers_comm_off_id) values
('Deion','Sanders','123456789','1st Lieutenant', 0,'Peterson', '21st Force Support Squadron',0),
('Charles','Kelley','234567890', 'Sergeant', 0, 'Peterson', '21st Force Support Squadron',1),
('Sean','Lewis','345678901', 'Sergeant', 1, 'Peterson','21st Force Support Squadron',1),
('Shedeur','Sanders','456789012','Specialist',0,'Peterson', '21st Force Support Squadron', 3),
('Van','Wells','567890123','Specialist',0,'Peterson', '21st Force Support Squadron', 3),
('Jalen','Sami','678901234','Specialist',0,'Peterson', '21st Force Support Squadron', 2),
('Travis','Hunter','789012345','Specialist',1,'Peterson', '21st Force Support Squadron', 2);


DROP TABLE IF EXISTS D4DDB.t_competency_model CASCADE;
CREATE TABLE IF NOT EXISTS D4DDB.t_competency_model (
  comp_model_id SERIAL PRIMARY KEY,
  comp_model_name varchar(45) DEFAULT NULL,
  comp_model_desc varchar(180) DEFAULT NULL
);

insert into D4DDB.t_competency_model (comp_model_name,comp_model_desc) values 
('43EX Bioenvironmental Engineer Model','The Occupational Competenices for the 43EX Specialty'),
('General KSAO','General Knowledge, Skills, Abilities or Other');


CREATE TABLE D4DDB.t_competency (
  comp_id SERIAL PRIMARY KEY,
  comp_name varchar(45) DEFAULT NULL,
  comp_desc varchar(180) DEFAULT NULL
);

insert into D4DDB.t_competency (comp_name,comp_desc) 
values ('Risk Assessment and Mitigation', 'Provide Risk Assessment and Mitiggation Plans'),
('Management','Provide Management'),
('Language','Language Profeciency');

CREATE TABLE D4DDB.t_sub_competency (
  sub_comp_id SERIAL PRIMARY KEY,
  sub_comp_name varchar(45) DEFAULT NULL,
  sub_comp_desc varchar(180) DEFAULT NULL
);

insert into D4DDB.t_sub_competency (sub_comp_name,sub_comp_desc) values 
('Data Collection','Collect Data for Analysis'),
('Program Management','Lead multi-track projects'),
('Data Entry','Enter in data'),
('Spanish Language','Proficeincy in the Spanish Language');

CREATE TABLE D4DDB.t_prof_level (
  prof_level_id SERIAL PRIMARY KEY,
  prof_level varchar(45) DEFAULT NULL
);

insert into d4ddb.t_prof_level (prof_level)
values ('Expert'),('Advanced'),('Intermediate'),('Basic'),('Untrained');

CREATE TABLE D4DDB.t_comp_map (
  comp_map_id SERIAL PRIMARY KEY,
  comp_model_id int DEFAULT NULL,
  comp_id int DEFAULT NULL,
  sub_comp_id int DEFAULT NULL,
  prof_level_id int DEFAULT NULL,
  behavior varchar(180) DEFAULT NULL
);

insert into D4DDB.t_comp_map (comp_model_id,comp_id,sub_comp_id,prof_level_id,behavior) values
(1,1,1,1,'Develops collection procedurs, methods, and models when existing models are not adequate available'),
(1,1,1,1,'Forcasts data gaps to drive further data collection or influence policy'),
(1,1,1,1,'Creates and/or advices on DoD/Service policy to improve or enhane data quality'),
(1,1,1,1,'Evaluates and fields new technology to meet warfighter needs'),
(1,1,1,2,'Approves sampling strategies for use to ensure Quality Assurance'),
(1,1,1,2,'Oversees/manages collection process to prevent DNBI and comply with DoD, Federal, state and local requirements'),
(1,1,1,2,'Sets organizational criteria, standards and priorities for data collection'),
(1,1,1,3, 'Creates sampling strategies to build an exposure assessment'),
(1,1,1,3, 'Identifies when sampling and data requirements are met'),
(1,1,1,4, 'Executes data collection methods and procesures to support exposure assessment'),
(1,1,1,4, 'Selects and utilizes the resources for data collection'),
(1,1,1,5, 'Untrained'),
(1,2,2,1, 'Develops tools and metrics to assess program health and maturity across the enterprise'),
(1,2,2,1, 'Develops policy and instruction to transform programs with BE equities'),
(1,2,2,2, 'Advises policy development through involvment activities'),
(1,2,2,2, 'Develops plans to meet emerging policy changes'),
(1,2,2,3, 'Utilizes metrics, programmatic reviews and self inspection tools to assess the health of programs'),
(1,2,2,3, 'Develops and implements corrective action plans to meet the requirements of programs'),
(1,2,2,3, 'Identifies and explains the regulation and requirements of programs'),
(1,2,2,4, 'Identifies and explains the regulations and requirements for assigned BE programs'),
(1,2,2,4, 'Manages a small team to execute assigned program'),
(1,2,2,4, 'Answers self inspection questions regarding assigned BE programs'),
(1,2,2,4, 'Communicates program gaps to appropriate leadership chain'),
(1,2,2,5, 'Untrained'),
(1,1,3,1, 'Approves/Improves SORs'),
(1,1,3,2, 'Interprets policy and develops guidance on data entry processes into SOR'),
(1,1,3,3, 'Instructs/assists others with data entry into SOR IAW published guidance to meet mission requirements'),
(1,1,3,4, 'Uses a SOR IAW [ublished guidance to meet mission requirements'),
(1,1,3,5, 'Untrained'),
(2,3,4,1, 'Natively Fluent'),
(2,3,4,2, 'Fluent'),
(2,3,4,3, 'Reasonably Fluent'),
(2,3,4,4, 'Some Understanding'),
(2,3,4,5, 'Untrained');

CREATE TABLE D4DDB.t_pers_comp_map (
  pers_comp_map_id SERIAL PRIMARY KEY,
  pers_id int DEFAULT NULL,
  comp_model_id int DEFAULT NULL,
  comp_id int DEFAULT NULL,
  sub_comp_id int DEFAULT NULL,
  prof_level_id int DEFAULT NULL,
  stat int DEFAULT NULL
);

insert into d4ddb.t_pers_comp_map (pers_id,comp_model_id,comp_id,sub_comp_id,prof_level_id, stat) values 
(1,1,1,1,1,1),
(1,1,2,2,1,1),
(1,1,1,3,1,1),
(1,2,3,4,3,1),
(2,1,1,1,2,1),
(2,1,1,3,2,1),
(2,2,3,4,3,1),
(3,1,2,2,2,0),
(3,2,3,4,2,1),
(4,1,1,1,3,1),
(4,1,1,3,2,1),
(5,1,1,1,3,1),
(5,1,1,3,4,0),
(5,2,3,4,1,1),
(6,1,2,2,3,1),
(7,1,2,2,3,0);

CREATE OR REPLACE VIEW D4DDB.v_pers AS select
tp.pers_id AS pers_id,
tp.pers_first_name AS pers_first_name,
tp.pers_last_name AS pers_last_name,
tp.pers_military_id AS pers_military_id,
tp.pers_rank AS pers_rank,
(case when (tp.pers_available = 0) then 'Unavailable' when (tp.pers_available = 1)then 'Available' end) AS available,
tp.pers_location AS pers_location,
tp.pers_unit AS pers_unit,
tp2.pers_military_id AS Comm_Officer,
tp2.pers_first_name AS comm_officer_first_name,
tp2.pers_last_name AS comm_officer_last_name
from (D4DDB.t_personnel tp left join D4DDB.t_personnel tp2 on((tp.pers_comm_off_id = tp2.pers_id)));

CREATE OR REPLACE VIEW D4DDB.v_comp AS select
m.behavior AS behavior,
cm.comp_model_id AS comp_model_id,
cm.comp_model_name AS comp_model_name,
c.comp_id AS comp_id,
c.comp_name AS comp_name,
sc.sub_comp_id AS sub_comp_id,
sc.sub_comp_name AS sub_comp_name,
pl.prof_level AS prof_level
from D4DDB.t_comp_map m
join D4DDB.t_competency_model cm on((m.comp_model_id = cm.comp_model_id)) 
join D4DDB.t_competency c on((m.comp_id = c.comp_id))
join D4DDB.t_sub_competency sc on((m.sub_comp_id = sc.sub_comp_id))
join D4DDB.t_prof_level pl on((m.prof_level_id = pl.prof_level_id));

CREATE OR REPLACE VIEW D4DDB.v_pers_comp AS select
p.pers_id AS pers_id,
p.pers_first_name AS pers_first_name,
p.pers_last_name AS pers_last_name,
p.pers_military_id AS pers_military_id,
p.pers_rank AS pers_rank,
p.available AS available,
p.pers_location AS pers_location,
p.pers_unit AS Pers_unit,
p.Comm_Officer AS comm_officer,
p.comm_officer_first_name AS comm_officer_first_name,
p.comm_officer_last_name AS comm_officer_last_name,
pcm.pers_comp_map_id AS pers_comp_map_id,
cm.comp_model_id AS comp_model_id,
cm.comp_model_name AS comp_model_name,
c.comp_id AS comp_id,
c.comp_name AS comp_name,
sc.sub_comp_id AS sub_comp_id,
sc.sub_comp_name AS sub_comp_name,
pl.prof_level AS prof_level,
(case when (pcm.stat = 0) then 'Pending' when (pcm.stat = 1) then 'Active' end) AS stat
from (((((D4DDB.v_pers p 
join D4DDB.t_pers_comp_map pcm on((p.pers_id = pcm.pers_id)))
join D4DDB.t_competency_model cm on((pcm.comp_model_id = cm.comp_model_id))) 
join D4DDB.t_competency c on((pcm.comp_id = c.comp_id)))
join D4DDB.t_sub_competency sc on((pcm.sub_comp_id = sc.sub_comp_id)))
join D4DDB.t_prof_level pl on((pcm.prof_level_id = pl.prof_level_id)));

-- CREATE OR REPLACE FUNCTION AUD_Personel(p_Act varchar(1), p_id int, p_first varchar(45),p_Last varchar(45), p_milID varchar(45), p_rank varchar(45), p_avail int, p_Loc varchar(45), p_unit varchar(45), p_off int)
-- RETURNS void
-- LANGUAGE SQL
-- AS $$
-- BEGIN
-- IF (p_Act='D') THEN
-- DELETE FROM t_personnel WHERE pers_id=p_id;
-- ELSIF (p_Act='A') THEN
-- INSERT INTO t_personnel (pers_first_name, pers_last_name, pers_military_id, pers_rank, pers_available, pers_unit, pers_comm_off_id)
-- VALUES (p_first, p_last, p_milID, p_rank, p_avail, p_loc, p_unit, p_off);
-- ELSIF (p_Act='U') THEN
-- DELETE FROM t_personnel WHERE pers_id=p_id;
-- INSERT INTO t_personnel (pers_first_name, pers_last_name, pers_military_id, pers_rank, pers_available, pers_unit, pers_comm_off_id)
-- VALUES (p_first, p_last, p_milID, p_rank, p_avail, p_loc, p_unit, p_off);
-- END IF;
-- END;