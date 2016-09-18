require "net/http"
require "net/https"
require "uri"

class GoogleSheetsClient

	def self.post(data, url)
		uri = URI.parse(url)
		request = Net::HTTP::Post.new(uri.path, 'Content-Type' => 'application/json')

		request.set_form_data(data)

		https = Net::HTTP.new(uri.host, uri.port)
		https.use_ssl = true

		# This returns a 302 code but still logs the data
		https.request(request)
	end
end