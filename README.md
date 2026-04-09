# Campus Enroll

## Table of Contents
1. [Title of the Project](#title-of-the-project)
2. [Description](#description)
3. [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
4. [Scope of Functionalities](#scope-of-functionalities)
5. [Examples of Use](#examples-of-use)
6. [Release History](#release-history)
7. [Project Status](#project-status)
8. [Sources](#sources)
9. [Other Information](#other-information)

## Title of the Project
Campus Enroll - Student Enrollment Form using JsonPowerDB

## Description
Campus Enroll is a micro project built with HTML, CSS, and JavaScript to manage student enrollment records in JsonPowerDB.

This project uses the following relation and database:
- Database: SCHOOL-DB
- Relation: STUDENT-TABLE
- Primary Key: Roll-No

Input fields:
- Roll-No
- Full-Name
- Class
- Birth-Date
- Address
- Enrollment-Date

The form follows required business flow:
- On load, only Roll-No is enabled; all other fields and action buttons are disabled.
- If Roll-No does not exist, Save and Reset are enabled for new entry.
- If Roll-No exists, data is loaded, Roll-No is locked, and Update and Reset are enabled.
- Validation ensures no field is empty before Save or Update.

## Benefits of using JsonPowerDB
1. Simple and fast JSON-based API for database operations.
2. Lightweight integration from frontend JavaScript without heavy backend setup.
3. Good fit for micro projects and prototypes due to quick development cycle.
4. Built-in support for key-based record retrieval (useful for primary key workflows).
5. Reduced development time for CRUD-focused forms.

## Scope of Functionalities
1. Primary key check by Roll-No.
2. Auto-switch between Create mode and Update mode.
3. Save new student records to JsonPowerDB.
4. Update existing student records in JsonPowerDB.
5. Reset form to initial state with focus control.
6. Status feedback for info, success, and error states.

## Examples of Use
1. Add a new student:
   - Enter a new Roll-No.
   - Fill all fields.
   - Click Save.

2. Update an existing student:
   - Enter an existing Roll-No.
   - Modify editable fields.
   - Click Update.

3. Reset the form:
   - Click Reset.
   - Form returns to initial state with cursor on Roll-No.

## Release History
- v1.0.0 - 2026-04-10
  - Initial Campus Enroll release with JsonPowerDB integration.
  - Implemented Save, Update, Reset workflow with required primary key logic.
  - Added field validation and state-based UI control.
  - Published code to GitHub: https://github.com/ulric-collaco/CampusEnroll

## Project Status
Completed for micro project submission.

## Sources
- JsonPowerDB official site: https://login2explore.com/jpdb/
- JsonPowerDB API helper library used in project:
  - https://login2explore.com/jpdb/resources/js/0.0.3/jpdb-commons.js

## Other Information
- Frontend stack: HTML5, CSS3, JavaScript, jQuery
- Database platform: JsonPowerDB
- Repository: https://github.com/ulric-collaco/CampusEnroll