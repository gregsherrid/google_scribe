Google Scribe
=========

Allows writing data to google sheets via a public URL. Useful for writing data or error logging
on small projects without the hassle of setting up a persistent data store.

Based on and inspired by
[Scott Olmsted's guide](http://railsrescue.com/blog/2015-05-28-step-by-step-setup-to-send-form-data-to-google-sheets/)
for doing a similar thing in javascript. That in turn
was based on this [post by Martin Hawksey](https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/).

Install
----

Add this line to your Gemfile:
```
gem 'google_scribe'
```

Complete the Google Scripts Setup (below) and save the url generated on the last step.

Usage
-----

Initialize:

```
scribe_url = "https://script.google.com/macros/s/..." # The Google Script URL 
scribe = GoogleScribe.new(scribe_url)
```

Log Data:

```
# Keys correspond to the columns on the google sheet (case-sensitive)
data = { "Name" => "Samwell", "Type" => "Raven", "Message" => "Happy Birthday" }
scribe.send_data(data)
```

Log Process:

````
scribe.log_process("Weekly Update Emails") do
	user_count = 0
	Users.find_each do |u|
		# ... send email to user
		user_count += 1
	end
	{ "Emails sent" => user_count }
end
```

If the block returns an error, GoogleScribe will log the exception message
and the first line of the backtrace in the "Error Message" column, if present.
The exception will still be raised normally, unless the exception is suppressed by calling
`scribe.log_process("Weekly Update Emails")`.

Google Scripts Setup
----

1. Create a sheet in Google Drive
2. Add the headers you're planning to pass to sheets (case-sensitive).
3. Optionally, add column for 'Timestamp.' To support process logging, add columns 'Process,' 'Success,' and 'Error Message'
4. Go to Tools -> Script Editor
5. Copy and paste the contents of [sheets_server.js](https://github.com/gregsherrid/google_scribe/blob/master/sheets_server.js) into the Code Editor and save
6. On the navbar of Script Editor, click Run -> setup
7. Sheets will request permissions, which you should grant
8. Click to File -> Manage Versions and save a version of the project
9. Click to Resources -> Current Project's Triggers. Select 'doPost', 'From spreadsheet', and 'On form submit.' Save
10. Click to Publish -> Deploy. Select '1,' 'Me,' and 'Anyone, even anonymous.' Click Deploy
11. Copy and save the URL in the dialog that appears

302 Response and Testing
----

Google responds to the logging attempt with a 302 temporary redirect message, but still correctly logs the data.
This has made setting up tests difficult.

License
----

MIT License

Author
----

Greg Sherrid
