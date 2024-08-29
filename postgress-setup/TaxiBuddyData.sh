#!/usr/bin/env bash

db_name="taxi_buddy"
db_user="postgres"

declare -A firstnameArray
declare -A middlenameArray 
declare -A lastnameArray

generate_firstname() {
    local firstname
    while true; do
        firstname="FirstName$(shuf -i 1000-9999 -n 1)"
        if [[ -z ${firstnameArray[$firstname]} ]]; then
            firstnameArray[$firstname]=1
            echo $firstname
            break
        fi
    done
}

generate_middlename() {
    local middlename
    while true; do
        middlename="MiddleName$(shuf -i 1000-9999 -n 1)"
        if [[ -z ${middlenameArray[$middlename]} ]]; then
            middlenameArray[$middlename]=1
            echo $middlename
            break
        fi
    done
}

generate_lastname() {
    local lastname
    while true; do
        lastname="LastName$(shuf -i 1000-9999 -n 1)"
        if [[ -z ${lastnameArray[$lastname]} ]]; then
            lastnameArray[$lastname]=1
            echo $lastname
            break
        fi
    done
}

generate_email() {
    local username=$1
    echo "$username@iiitkottayam.ac.in"
}

generate_date() {
    echo "$(date -d "$((RANDOM % 30 + 1)) days ago" +"%Y-%m-%d")"
}

generate_time() {
    local hour min sec
    hour=$(printf "%02d" $((RANDOM % 24)))
    min=$(printf "%02d" $((RANDOM % 60)))
    sec=$(printf "%02d" $((RANDOM % 60)))

    echo "$hour:$min:$sec"
}

generate_password() {
    echo "$(openssl rand -base64 12)"
}

generate_integers() {
    local length=$1
    local number=""
    for i in $(seq 1 $length); do 
        number="${number}$((RANDOM % 10))"
    done

    echo "$number"
}

populate_users() {
    local count=$1
    for i in $(seq 1 $count); do
        FIRSTNAME=$(generate_firstname)
        MIDDLENAME=$(generate_middlename)
        LASTNAME=$(generate_lastname)
        EMAIL=$(generate_email "$MIDDLENAME")
        PHONE_NUMBER=$(generate_integers 10)
        PASSWORD=$(generate_password)
        PROFILE_PICTURE="profile_picture_$i.png"

        psql -d $db_name -U $db_user -c "INSERT INTO Users (Name, ClgEmail, PhoneNumber, Password, ProfilePicturePng) VALUES (ROW('$FIRSTNAME','$MIDDLENAME','$LASTNAME'), '$EMAIL', '$PHONE_NUMBER', '$PASSWORD', '$PROFILE_PICTURE');"
    done
}

populate_bookings() {
    local count=$1
    for i in $(seq 1 $count); do
        INITIATOR_ID=$((RANDOM % 10 + 1))
        TIME_BOOKED=$(generate_time)
        DATE_BOOKED=$(generate_date)
        VEHICLE="Vehicle_$i"
        SOURCE_PLACE="Source_$i"
        DESTINATION="Destination_$i"
        MAX_MEMBERS=$((RANDOM % 10 + 1))
        CURRENT_MEMBERS=$((RANDOM % MAX_MEMBERS + 1))

        psql -d $db_name -U $db_user -c "INSERT INTO Bookings (InitiatorID, TimeBooked, DateBooked, Vehicle, SourcePlace, Destination, MaxMembers, CurrentMembers) VALUES ($INITIATOR_ID, '$TIME_BOOKED', '$DATE_BOOKED', '$VEHICLE', '$SOURCE_PLACE', '$DESTINATION', $MAX_MEMBERS, $CURRENT_MEMBERS);"
    done
}

populate_messages() {
    local count=$1
    for i in $(seq 1 $count); do
        USER_ID=$((RANDOM % 10 + 1))
        BOOKING_ID=$((RANDOM % 10 + 1))
        TIME_SENT=$(generate_time)
        DATE_SENT=$(generate_date)
        MESSAGE_TXT="Message text $i"

        psql -d $db_name -U $db_user -c "INSERT INTO Messages (UserID, BookingID, TimeSent, DateSent, MessageTxt) VALUES ($USER_ID, $BOOKING_ID, '$TIME_SENT', '$DATE_SENT', '$MESSAGE_TXT');"
    done
}

populate_booking_requests() {
    local count=$1
    for i in $(seq 1 $count); do
        USER_ID=$((RANDOM % 10 + 1))
        BOOKING_ID=$((RANDOM % 10 + 1))
        REQUEST_STATUS="Pending"
        TIME_SENT=$(generate_time)
        DATE_SENT=$(generate_date)

        psql -d $db_name -U $db_user -c "INSERT INTO BookingRequests (UserID, BookingID, RequestStatus, TimeSent, DateSent) VALUES ($USER_ID, $BOOKING_ID, '$REQUEST_STATUS', '$TIME_SENT', '$DATE_SENT');"
    done
}

populate_user_bookings() {
    local iterations=$1
    local max_attempts=1000
    local attempt=0

    declare -A GENERATED_USER_BOOKINGS

    while [ ${#GENERATED_USER_BOOKINGS[@]} -lt $iterations ] && [ $attempt -lt $max_attempts ]; do
        USER_ID=$((RANDOM % $iterations + 1))
        BOOKING_ID=$((RANDOM % $iterations + 1))
        KEY="$USER_ID-$BOOKING_ID"

        if [ -z "${GENERATED_USER_BOOKINGS[$KEY]}" ]; then
            GENERATED_USER_BOOKINGS[$KEY]=1

            psql -d $db_name -U $db_user -c "INSERT INTO UserBookings (UserID, BookingID) VALUES ($USER_ID, $BOOKING_ID);" 2>/dev/null

            if [ $? -ne 0 ]; then
                echo "Failed to insert (UserID: $USER_ID, BookingID: $BOOKING_ID). It might be a duplicate or other error."
            fi
        fi

        ((attempt++))
    done

    if [ $attempt -ge $max_attempts ]; then
        echo "Warning: Reached maximum number of attempts to generate unique UserID-BookingID pairs."
    fi
}

# Prompt for user input and populate tables
echo "How many rows of data do you want to generate? (e.g., 20)"
read dataPoints

if [[ ! $dataPoints =~ ^[0-9]+$ ]] || [ $dataPoints -le 0 ]; then
    echo "Invalid input. Please enter a positive integer."
    exit 1
fi

populate_users $dataPoints
populate_bookings $dataPoints
populate_messages $dataPoints
populate_booking_requests $dataPoints
populate_user_bookings $dataPoints

echo "Data population completed!"
