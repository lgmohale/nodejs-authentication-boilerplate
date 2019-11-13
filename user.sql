CREATE TABLE person(
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_name VARCHAR (150) NOT NULL,
    user_surname VARCHAR (150) NOT NULL,
    user_email VARCHAR (150) NOT NULL,
    user_password VARCHAR (150) NOT NULL,
    created_at DATE,
    updated_at DATE
);
