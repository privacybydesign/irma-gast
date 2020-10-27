CREATE DATABASE irmagastdb;
CREATE USER 'irmagast'@'localhost' IDENTIFIED BY 'irmagast';
GRANT ALL PRIVILEGES on irmagastdb.* TO 'irmagast' IDENTIFIED BY 'irmagast';
FLUSH PRIVILEGES;
USE irmagastdb;

CREATE TABLE locations (
  location_id varchar(27) NOT NULL PRIMARY KEY,
  name varchar(100) NOT NULL,
  location varchar(100) NOT NULL,
  email varchar(255) NOT NULL,
  onetime boolean NOT NULL,
  creation_date TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  last_checkin TIMESTAMP NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT charset=utf8;

create table checkins (
  location_id varchar(27) NOT NULL,
  time TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  ct BLOB NOT NULL,
  constraint fk_id2
    FOREIGN KEY(location_id)
    REFERENCES locations(location_id)
) ENGINE=InnoDB DEFAULT charset=utf8;
