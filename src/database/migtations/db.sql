-- CREATE TABLE activities(
--     activity_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
-- 	title VARCHAR(100) NOT NULL,
-- 	email VARCHAR(255),
-- 	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- 	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--                 ON UPDATE CURRENT_TIMESTAMP,
-- 	PRIMARY KEY (activity_id)
-- );

-- CREATE TABLE todos(
--     todo_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
-- 	activity_group_id BIGINT UNSIGNED NOT NULL,
-- 	title VARCHAR(255) NOT NULL,
-- 	priority VARCHAR(50),
-- 	is_active BOOLEAN,
-- 	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,n
-- 	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--                 ON UPDATE CURRENT_TIMESTAMP,
-- 	PRIMARY KEY (todo_id),
-- 	FOREIGN KEY (activity_group_id) REFERENCES activities(activity_id) ON DELETE CASCADE
-- );

-- INSERT INTO activities (title, email)
-- values ("test", "test@gmail.com");

-- DELETE FROM activities WHERE activity_id=19;



