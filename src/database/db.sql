CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    phone INTEGER NOT NULL
);

CREATE TABLE person(
    id INTEGER REFERENCES users (id),
    national_id NUMBER NOT NULL UNIQUE,
    first_name TEXT NOT NULl,
    last_name TEXT NOT NULl
);

CREATE TABLE company(
    id INTEGER REFERENCES users (id),
    nit NUMBER NOT NULL UNIQUE,
    company_name TEXT NOT NULL,

);