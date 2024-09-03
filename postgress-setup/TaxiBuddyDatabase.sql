-- Drop database if exists 
DROP DATABASE taxi_buddy ;

-- Create the TaxiBuddy database
CREATE DATABASE taxi_buddy;

-- Connect to the TaxiBuddy database
\c taxi_buddy;

-- Composite Type for Name (FirstName, MiddleName, LastName)
CREATE TYPE name_type AS (
    FirstName VARCHAR(255),
    LastName VARCHAR(255)
);

-- Users Table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY, -- SERIAL is a autoincrement 
    Name name_type, -- Composite attribute for Name
    CollegeEmail VARCHAR(255) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(10),
    Password VARCHAR(255),
    ProfilePicturePng TEXT
);

-- Bookings Table
CREATE TABLE Bookings (
    BookingID SERIAL PRIMARY KEY,
    InitiatorID INT REFERENCES Users(UserID),
    TimeBooked TIME NOT NULL,
    DateBooked DATE NOT NULL,
    Vehicle VARCHAR(100),
    SourcePlace VARCHAR(255),
    Destination VARCHAR(255),
    Luggage VARCHAR(100),
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

INSERT INTO Users (
    Name, CollegeEmail, PhoneNumber, Password, ProfilePicturePng
) VALUES
    (ROW('John', 'Doe'), 'john.doe1@college.edu', '9876543210', 'password123', '/images/john_doe.png'),
    (ROW('Jane', 'Smith'), 'jane.smith2@college.edu', '8765432109', 'password456', '/images/jane_smith.png'),
    (ROW('Michael', 'Johnson'), 'michael.johnson3@college.edu', '7654321098', 'password789', '/images/michael_johnson.png'),
    (ROW('Emily', 'Davis'), 'emily.davis4@college.edu', '6543210987', 'password321', '/images/emily_davis.png'),
    (ROW('Daniel', 'Miller'), 'daniel.miller5@college.edu', '5432109876', 'password654', '/images/daniel_miller.png'),
    (ROW('Sarah', 'Wilson'), 'sarah.wilson6@college.edu', '4321098765', 'password987', '/images/sarah_wilson.png'),
    (ROW('David', 'Moore'), 'david.moore7@college.edu', '3210987654', 'password111', '/images/david_moore.png'),
    (ROW('Sophia', 'Taylor'), 'sophia.taylor8@college.edu', '2109876543', 'password222', '/images/sophia_taylor.png'),
    (ROW('James', 'Anderson'), 'james.anderson9@college.edu', '1098765432', 'password333', '/images/james_anderson.png'),
    (ROW('Olivia', 'Thomas'), 'olivia.thomas10@college.edu', '9087654321', 'password444', '/images/olivia_thomas.png'),
    (ROW('Christopher', 'Jackson'), 'christopher.jackson11@college.edu', '8076543210', 'password555', '/images/christopher_jackson.png'),
    (ROW('Isabella', 'White'), 'isabella.white12@college.edu', '7065432109', 'password666', '/images/isabella_white.png'),
    (ROW('Matthew', 'Harris'), 'matthew.harris13@college.edu', '6054321098', 'password777', '/images/matthew_harris.png'),
    (ROW('Mia', 'Martin'), 'mia.martin14@college.edu', '5043210987', 'password888', '/images/mia_martin.png'),
    (ROW('Joshua', 'Thompson'), 'joshua.thompson15@college.edu', '4032109876', 'password999', '/images/joshua_thompson.png'),
    (ROW('Ava', 'Garcia'), 'ava.garcia16@college.edu', '3021098765', 'password000', '/images/ava_garcia.png'),
    (ROW('Ethan', 'Martinez'), 'ethan.martinez17@college.edu', '2010987654', 'password112', '/images/ethan_martinez.png'),
    (ROW('Charlotte', 'Robinson'), 'charlotte.robinson18@college.edu', '1009876543', 'password223', '/images/charlotte_robinson.png'),
    (ROW('Benjamin', 'Clark'), 'benjamin.clark19@college.edu', '9998765432', 'password334', '/images/benjamin_clark.png'),
    (ROW('Amelia', 'Rodriguez'), 'amelia.rodriguez20@college.edu', '8887654321', 'password445', '/images/amelia_rodriguez.png'),
    (ROW('Logan', 'Lewis'), 'logan.lewis21@college.edu', '7776543210', 'password556', '/images/logan_lewis.png'),
    (ROW('Harper', 'Lee'), 'harper.lee22@college.edu', '6665432109', 'password667', '/images/harper_lee.png'),
    (ROW('Mason', 'Walker'), 'mason.walker23@college.edu', '5554321098', 'password778', '/images/mason_walker.png'),
    (ROW('Lily', 'Hall'), 'lily.hall24@college.edu', '4443210987', 'password889', '/images/lily_hall.png'),
    (ROW('Alexander', 'Allen'), 'alexander.allen25@college.edu', '3332109876', 'password990', '/images/alexander_allen.png');

INSERT INTO Bookings (
    InitiatorID, TimeBooked, DateBooked, Vehicle, Luggage,SourcePlace, Destination, MaxMembers, CurrentMembers
) VALUES
    (7, '10:00', '2024-08-29', 'Car','1 Cabin Bag', 'IIITK', 'Ernakulam Junction', 4, 1),
    (12, '12:30', '2024-08-29', 'Van','1 Cabin Bag', 'Kottayam', 'Pala', 8, 3),
    (11, '12:30', '2024-08-29', 'Van','1 Cabin Bag', 'Kottayam', 'Pala', 8, 3),
    (3, '15:45', '2024-08-30', 'Bus','1 Cabin Bag', 'Cochin International airport', 'IIITK', 20, 15),
    (19, '09:15', '2024-08-31', 'Car','1 Cabin Bag', 'Ernakulam Junction', 'Kottayam', 4, 2),
    (5, '18:00', '2024-08-31', 'SUV', '1 Cabin Bag','Pala', 'Cochin International airport', 6, 4),
    (10, '14:30', '2024-09-01', 'Van','1 Cabin Bag', 'IIITK', 'Pala', 8, 6),
    (16, '11:45', '2024-09-02', 'Car','1 Cabin Bag', 'Kottayam', 'Ernakulam Junction', 4, 1),
    (8, '17:30', '2024-09-03', 'Bus', '1 Cabin Bag','Cochin International airport', 'Kottayam', 40, 20),
    (1, '10:00', '2024-09-03', 'Car', '1 Cabin Bag','Pala', 'IIITK', 4, 2),
    (20, '19:00', '2024-09-04', 'SUV','1 Cabin Bag','Ernakulam Junction', 'Cochin International airport', 6, 5),
    (4, '08:30', '2024-09-05', 'Car','Any', 'Kottayam', 'IIITK', 4, 2),
    (13, '16:00', '2024-09-06', 'Van','Any', 'Cochin International airport', 'Pala', 8, 4),
    (6, '10:15', '2024-09-07', 'Bus', '1 Cabin Bag','IIITK', 'Cochin International airport', 50, 35),
    (17, '13:30', '2024-09-08', 'Car','Any', 'Pala', 'Ernakulam Junction', 4, 3),
    (9, '11:00', '2024-09-09', 'SUV', '1 Cabin Bag','Kottayam', 'Cochin International airport', 6, 4),
    (2, '18:45', '2024-09-10', 'Van', '1 Cabin Bag','Ernakulam Junction', 'IIITK', 8, 7),
    (14, '09:30', '2024-09-11', 'Bus', '1 Cabin Bag','Pala', 'Kottayam', 30, 25),
    (18, '15:00', '2024-09-12', 'Car', '1 Cabin Bag','Cochin International airport', 'Ernakulam Junction', 4, 2),
    (11, '07:45', '2024-09-13', 'SUV','1 Cabin Bag', 'IIITK', 'Kottayam', 6, 5),
    (15, '17:15', '2024-09-14', 'Bus', '1 Cabin Bag','Kottayam', 'Pala', 40, 30);



INSERT INTO bookingrequests (UserID, BookingID, RequestStatus, TimeSent) VALUES
(11, 2, 'pending', NOW()),
(1, 10, 'pending', NOW()),
(2, 11, 'approved', NOW()),
(3, 12, 'pending', NOW()),
(13, 13, 'pending', NOW()),
(15, 14, 'approved', NOW()),
(6, 15, 'pending', NOW()),
(11, 9, 'pending', NOW()),
(8, 8, 'approved', NOW()),
(11, 7, 'pending', NOW()),
(10, 6, 'pending', NOW());

INSERT INTO UserBookings (UserID, BookingID) VALUES (1, 2), (2, 2), (3, 3),(5,2),(7,3),(1,5),(1,17);

