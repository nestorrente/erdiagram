CREATE TABLE Person (
    personId BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    cityId BIGINT NOT NULL,
    alternativeCityId BIGINT NOT NULL,
    CONSTRAINT Person_pk PRIMARY KEY (personId),
    CONSTRAINT Person_cityId_uk UNIQUE (cityId)
);

CREATE TABLE City (
    cityId BIGINT NOT NULL AUTO_INCREMENT,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT City_pk PRIMARY KEY (cityId),
    CONSTRAINT City_code_uk UNIQUE (code)
);

ALTER TABLE Person ADD CONSTRAINT Person_cityId_fk FOREIGN KEY (cityId) REFERENCES City (cityId);
ALTER TABLE Person ADD CONSTRAINT Person_alternativeCityId_fk FOREIGN KEY (alternativeCityId) REFERENCES City (cityId);
