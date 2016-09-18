require "google_scribe/google_sheets_client"

class GoogleScribe
	attr_accessor :url

	def initialize(url = nil)
		self.url = url
	end

	def send_data(data)
		GoogleSheetsClient.post(data, self.url)
	end
end