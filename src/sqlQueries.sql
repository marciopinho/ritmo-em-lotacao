-- create the buses table:

CREATE TABLE buses (
  vehicle_number INTEGER,
  longitude FLOAT,
  latitude FLOAT,
  timestamp DATETIME,
  PRIMARY KEY (vehicle_number, timestamp)
);

-- INSERT statement with a WHERE clause to check if longitude and latitude
-- have changed from the last response:

INSERT INTO buses (vehicle_number, longitude, latitude, timestamp)
SELECT vehicle_number, longitude, latitude, timestamp
FROM api_response
WHERE (longitude, latitude) NOT IN (SELECT longitude, latitude FROM buses WHERE vehicle_number = api_response.vehicle_number);
-- the WHERE clause above will prevent duplicate lon lat pairs, which is fine if it means the bus has not moved since the last response,
-- but theoretically the same bus could have been in the exact same coordinates before, even if it has moved since then.