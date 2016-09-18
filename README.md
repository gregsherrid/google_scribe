Google Sheets Logging
=========

Based on and inspired by Scott Olmsted's excellent work
http://railsrescue.com/blog/2015-05-28-step-by-step-setup-to-send-form-data-to-google-sheets/

Google Sheets setup
----

1. Create a sheet in Google Drive
2. Add the headers you're planning to pass to sheets (case-sensitive). Optionally, add 'Timestamp' as well
3. Go to Tools -> Script Editor
4. Copy and past the contents of sheets_server.js into the Code Editor and save
5. On the navbar of Script Editor, click Run -> setup
6. Sheets will request permissions, which you should grant
7. Click to File -> Manage Versions and save a version of the project
8. Click to Resources -> Current Project's Triggers. Select 'doPost', 'From spreadsheet', and 'On form submit.' Save
10. Click to Publish -> Deploy. Select '1,' 'Me,' and 'Anyone, even anonymous.' Click Deploy
11. Copy and save the URL in the dialog that appears