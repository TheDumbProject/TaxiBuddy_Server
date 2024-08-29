-- Drop database if exists 
DROP DATABASE taxi_buddy ;

-- Create the TaxiBuddy database
CREATE DATABASE taxi_buddy;

-- Connect to the TaxiBuddy database
\c taxi_buddy;

-- Composite Type for Name (FirstName, MiddleName, LastName)
CREATE TYPE name_type AS (
    FirstName VARCHAR(255),
    MiddleName VARCHAR(255),
    LastName VARCHAR(255)
);

-- Users Table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY, -- SERIAL is a autoincrement 
    Name name_type, -- Composite attribute for Name
    ClgEmail VARCHAR(255) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(10),
    Password VARCHAR(255),
    ProfilePicturePng TEXT
);

-- Bookings Table
CREATE TABLE Bookings (
    BookingID SERIAL PRIMARY KEY,
    InitiatorID INT REFERENCES Users(UserID),
    DateTime TIMESTAMP NOT NULL,
    Vehicle VARCHAR(100),
    SourcePlace VARCHAR(255),
    Destination VARCHAR(255),
    MaxMembers INT,
    CurrentMembers INT
);

-- Messages Table
CREATE TABLE Messages (
    MessageID SERIAL PRIMARY KEY,
    UserID INT REFERENCES Users(UserID),
    BookingID INT REFERENCES Bookings(BookingID),
    TimeSent TIMESTAMP NOT NULL,
    MessageTxt TEXT
);

-- BookingRequests Table
CREATE TABLE BookingRequests (
    RequestID SERIAL PRIMARY KEY,
    UserID INT REFERENCES Users(UserID),
    BookingID INT REFERENCES Bookings(BookingID),
    RequestStatus VARCHAR(20) NOT NULL,
    TimeSent TIMESTAMP NOT NULL
);

-- UserBookings Join Table
CREATE TABLE UserBookings (
    UserID INT REFERENCES Users(UserID),
    BookingID INT REFERENCES Bookings(BookingID),
    PRIMARY KEY (UserID, BookingID)
);

-- Sample Data Insertion
INSERT INTO Users (Name, ClgEmail, PhoneNumber, Password) VALUES 
(ROW('Alice', 'M.', 'Johnson'), 'alice@example.com', '555-1234', 'password123'),
(ROW('Bob', NULL, 'Smith'), 'bob@example.com', '555-5678', 'password456');

INSERT INTO Bookings (InitiatorID, DateTime, Vehicle, SourcePlace, Destination, MaxMembers, CurrentMembers) VALUES 
(1, '2024-09-01 08:00:00', 'Sedan', '123 Main St', '456 Elm St', 4, 1),
(2, '2024-09-02 09:00:00', 'SUV', '789 Oak St', '101 Pine St', 5, 2);

INSERT INTO Messages (UserID, BookingID, TimeSent, MessageTxt) VALUES 
(1, 1, '2024-08-28 10:00:00', 'Looking forward to the ride!'),
(2, 2, '2024-08-28 10:30:00', 'Can we stop for coffee on the way?');

INSERT INTO BookingRequests (UserID, BookingID, RequestStatus, TimeSent) VALUES 
(1, 1, 'Pending', '2024-08-28 11:00:00'),
(2, 2, 'Accepted', '2024-08-28 11:30:00');

INSERT INTO bookings (initiatorid, datetime, vehicle, sourceplace, destination, maxmembers, currentmembers)
VALUES 
    (1, '2024-08-29 10:00:00', 'Car', 'IIITK', 'Ernakulam Junction', 4, 2),
    (1, '2024-08-30 15:00:00', 'Van', 'Ernakulam Junction', 'Kottayam Railway Station', 6, 5),
    (1, '2024-08-31 09:00:00', 'Bus', 'Kottayam Railway Station', 'Pala', 20, 15),
    (1, '2024-09-01 14:30:00', 'Bike', 'Pala', 'Cochin International Airport', 1, 1),
    (1, '2024-09-02 18:45:00', 'SUV', 'Cochin International Airport', 'IIITK', 5, 3),
    (1, '2024-09-03 08:00:00', 'Car', 'Ernakulam Junction', 'Pala', 4, 4),
    (1, '2024-09-04 12:15:00', 'Van', 'IIITK', 'Cochin International Airport', 6, 2),
    (2, '2024-09-05 14:00:00', 'Bus', 'Kottayam Railway Station', 'Ernakulam Junction', 30, 25),
    (1, '2024-09-06 09:45:00', 'Car', 'Pala', 'Kottayam Railway Station', 4, 3),
    (1, '2024-09-07 16:30:00', 'SUV', 'Cochin International Airport', 'Pala', 5, 4),
    (2, '2024-09-08 07:00:00', 'Van', 'IIITK', 'Ernakulam Junction', 6, 3),
    (1, '2024-09-09 11:00:00', 'Car', 'Kottayam Railway Station', 'IIITK', 4, 2),
    (1, '2024-09-10 13:00:00', 'Bike', 'Ernakulam Junction', 'Pala', 1, 1),
    (1, '2024-09-11 17:00:00', 'Bus', 'Pala', 'Cochin International Airport', 20, 10),
    (2, '2024-09-12 19:45:00', 'SUV', 'IIITK', 'Ernakulam Junction', 5, 5),
    (1, '2024-09-13 10:00:00', 'Car', 'Cochin International Airport', 'Kottayam Railway Station', 4, 3),
    (1, '2024-09-14 15:30:00', 'Van', 'Pala', 'IIITK', 6, 2),
    (1, '2024-09-15 08:15:00', 'Bus', 'Ernakulam Junction', 'Cochin International Airport', 30, 18),
    (2, '2024-09-16 14:45:00', 'Car', 'IIITK', 'Pala', 4, 4),
    (1, '2024-09-17 18:30:00', 'SUV', 'Kottayam Railway Station', 'Cochin International Airport', 5, 4);
