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
