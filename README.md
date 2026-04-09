# Campus Enroll

## Title of the Project
Campus Enroll: Student Enrollment Form using JsonPowerDB

## Description
Campus Enroll is a web-based micro project that performs student record management using JsonPowerDB as the primary data store.

The application is built with HTML, CSS, JavaScript, and jQuery, and follows a primary-key-first workflow.

Project database details:
1. Database Name: SCHOOL-DB
2. Relation Name: STUDENT-TABLE
3. Primary Key: Roll-No

Input fields in the form:
1. Roll-No
2. Full-Name
3. Class
4. Birth-Date
5. Address
6. Enrollment-Date

## Table of Contents
1. [Title of the Project](#title-of-the-project)
2. [Description](#description)
3. [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
4. [Illustrations](#illustrations)
5. [Scope of Functionalities](#scope-of-functionalities)
6. [Examples of Use](#examples-of-use)
7. [How to Run](#how-to-run)
8. [Release History](#release-history)
9. [Project Status](#project-status)
10. [Sources](#sources)
11. [Other Information](#other-information)

## Benefits of using JsonPowerDB
1. Lightweight and fast JSON-based database interactions.
2. Easy frontend integration without writing a full backend service.
3. Suitable for micro projects and assignment-level CRUD systems.
4. Key-based record operations simplify primary key workflows.
5. Faster development and testing for form-based applications.

## Illustrations
Application flow:

1. Page Load
2. Only Roll-No enabled, other fields and buttons disabled
3. User enters Roll-No
4. System checks Roll-No in JsonPowerDB
5. If Roll-No does not exist:
   - Enable Save and Reset
   - Enable remaining input fields
   - Focus next field
6. If Roll-No exists:
   - Fetch and display existing data
   - Disable Roll-No
   - Enable Update and Reset
   - Focus next field
7. Save or Update record
8. Return to initial state

## Scope of Functionalities
1. Initial form state handling as per assignment requirements.
2. Primary key existence check using Roll-No.
3. Automatic Create mode for new Roll-No values.
4. Automatic Update mode for existing Roll-No values.
5. Client-side validation for non-empty fields.
6. Save operation to insert new records.
7. Update operation to modify existing records.
8. Reset operation to clear form and restore initial state.
9. Visual status messages for info, success, and error scenarios.

## Examples of Use
1. Create a new student record:
   - Enter a Roll-No that does not exist.
   - Fill all remaining fields.
   - Click Save.
   - Observe success message and form reset.

2. Update an existing student record:
   - Enter a Roll-No that already exists.
   - Existing data loads automatically.
   - Edit required fields.
   - Click Update.
   - Observe success message and form reset.

3. Reset current operation:
   - Click Reset at any point during create or update mode.
   - Form returns to initial mode with focus on Roll-No.

## How to Run
1. Clone or download the repository.
2. Open project folder in Visual Studio Code.
3. Run the project with a local server extension (for example Live Server).
4. Open index.html in browser through local server.
5. Use the form and verify Save and Update behavior with JsonPowerDB.

## Release History
1. v1.0.0 - 2026-04-10
   - Initial release of Campus Enroll.
   - JsonPowerDB connected with SCHOOL-DB and STUDENT-TABLE.
   - Implemented required Save, Update, Reset workflow.
   - Added non-empty validation for all fields.
   - Added status messaging for better user feedback.
   - Published to GitHub: https://github.com/ulric-collaco/CampusEnroll

## Project Status
Submission-ready.

Current state:
1. Core assignment requirements completed.
2. UI and workflow behavior completed.
3. JsonPowerDB integration completed.

## Sources
1. JsonPowerDB official website:
   - https://login2explore.com/jpdb/
2. JsonPowerDB helper library:
   - https://login2explore.com/jpdb/resources/js/0.0.3/jpdb-commons.js

## Other Information
1. Frontend stack: HTML5, CSS3, JavaScript, jQuery
2. Database platform: JsonPowerDB
3. Repository link: https://github.com/ulric-collaco/CampusEnroll
4. Main files:
   - index.html
   - styles.css
   - script.js