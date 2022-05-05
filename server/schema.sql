CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(50)
);

CREATE TABLE rooms (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  roomname varchar(50)
);

CREATE TABLE messages (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room  int,
  text varchar(255),
  user int,
  FOREIGN KEY (room) REFERENCES rooms(id),
  FOREIGN KEY (user) REFERENCES users(id)
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

