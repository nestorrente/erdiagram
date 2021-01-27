CREATE TABLE Employee (
    employeeId BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    companyId BIGINT NOT NULL,
    CONSTRAINT Employee_pk PRIMARY KEY (employeeId),
    CONSTRAINT Employee_company_fk FOREIGN KEY (companyId) REFERENCES Company (companyId)
);

CREATE TABLE Company (
    companyId BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    fundationDate DATE NOT NULL,
    moneyAmount DECIMAL,
    CONSTRAINT Company_pk PRIMARY KEY (companyId)
);
