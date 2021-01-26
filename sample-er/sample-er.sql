CREATE TABLE Employee (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    companyId BIGINT NOT NULL,
    bossId BIGINT NOT NULL,
    CONSTRAINT Employee_pk PRIMARY KEY (id),
    CONSTRAINT Employee_company_fk FOREIGN KEY (companyId) REFERENCES Company (id),
    CONSTRAINT Employee_boss_fk FOREIGN KEY (bossId) REFERENCES Employee (id)
);

CREATE TABLE Company (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    fundationDate DATE NOT NULL,
    CONSTRAINT Company_pk PRIMARY KEY (id)
);
