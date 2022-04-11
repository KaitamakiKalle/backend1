CREATE TABLE `Students` (
	`studentid` int( 11 ) NOT NULL AUTO_INCREMENT,
	`studentcode` varchar( 6 ) NOT NULL,
	`name` varchar( 100 ),
	`email` varchar( 50 ),
	`studypoints` int( 3 ),
	PRIMARY KEY ( `studentid` ),
	UNIQUE KEY `studentcode` ( `studentcode` )); 

CREATE TABLE `Grades` (
    	`gradeid` int NOT NULL AUTO_INCREMENT,
    	`studentcode` varchar( 6 ) NOT NULL,
    	`coursecode` varchar ( 50 ),
    	`grade` int( 1 ),
    	CONSTRAINT `UC_grade` UNIQUE (`studentcode`,`coursecode`),
    	PRIMARY KEY (`gradeid`),
    	FOREIGN KEY (`studentcode`) REFERENCES Students(`studentcode`));



