#!/usr/bin/env bash 

# Creates the schema for taxiBuddy
psql -U postgres -a -f ~/TaxiBuddy_Server/postgress-setup/TaxiBuddyDatabase.sql
