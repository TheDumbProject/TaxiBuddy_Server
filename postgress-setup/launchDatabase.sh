#!/usr/bin/env bash 

psql -U postgres -a -f ~/TaxiBuddy_Server/postgress-setup/TaxiBuddyDatabase.sql
# runs the taxibuddy database script

psql -U postgres -d taxi_buddy -c "\l" -c "\dt"
