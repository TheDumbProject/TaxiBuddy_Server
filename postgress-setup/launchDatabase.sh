#!/usr/bin/env bash 

# Creates the schema for taxiBuddy
psql -U postgres -a -f ~/TaxiBuddy_Server/postgress-setup/TaxiBuddyDatabase.sql

# populates the database
~/TaxiBuddy_Server/postgress-setup/TaxiBuddyData.sh

psql -U postgres -d taxi_buddy -c "\l" -c "\dt"
