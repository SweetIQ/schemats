DROP TABLE IF EXISTS location;

CREATE TABLE location (
    location_type enum('city', 'province', 'country')
);

DROP TABLE IF EXISTS location_history;

CREATE TABLE location_history (
    location_type enum('city', 'state', 'country')
);
