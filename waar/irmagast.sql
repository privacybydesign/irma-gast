CREATE DATABASE irmagastdb;
CREATE USER 'irmagast'@'localhost' IDENTIFIED BY 'irmagast';
GRANT ALL PRIVILEGES on irmagastdb.* TO 'irmagast' IDENTIFIED BY 'irmagast';
FLUSH PRIVILEGES;
SET GLOBAL event_scheduler = ON;
USE irmagastdb;

CREATE TABLE locations (
  location_id varchar(27) NOT NULL PRIMARY KEY,
  name varchar(35) NOT NULL,
  location varchar(35) NOT NULL,
  email varchar(35) NOT NULL,
  constraint unique_name
    UNIQUE KEY(name)
) ENGINE=InnoDB DEFAULT charset=utf8;

CREATE TABLE gastsessions (
  location_id varchar(27) NOT NULL,
  token varchar(27) NOT NULL,
  time TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  constraint unique_token
    UNIQUE KEY(token),
  constraint fk_id1
    FOREIGN KEY(location_id)
    REFERENCES locations(location_id)
) ENGINE=InnoDB DEFAULT charset=utf8;

create table checkins (
  location_id varchar(27) NOT NULL,
  time TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  ct BLOB NOT NULL,
  constraint fk_id2
    FOREIGN KEY(location_id)
    REFERENCES locations(location_id)
) ENGINE=InnoDB DEFAULT charset=utf8;

-- Cleanup the check-in table 
CREATE EVENT cleaning ON SCHEDULE EVERY 1 HOUR ENABLE DO DELETE FROM checkins WHERE time <=DATE_SUB(NOW(), INTERVAL 2 WEEK);

-- Cleanup event for the ongoing sessions
CREATE EVENT session_cleanup ON SCHEDULE EVERY 1 MINUTE ENABLE DO DELETE FROM gastsessions WHERE time <=DATE_SUB(NOW(), INTERVAL 5 MINUTE);
