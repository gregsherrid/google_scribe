require "google_scribe/google_sheets_client"

class GoogleScribe
	attr_accessor :url

	def initialize(url = nil)
		self.url = url
	end

	def send_data(data)
		GoogleSheetsClient.post(data, self.url)
	end

	# Will log the data returned by the block
	# If the process fails, it will log the error message instead
	# If preserve_exceptions is false, exceptions will fail silently
	# otherwise, the exception will be logged normally
	def log_process(process_name, preserve_exceptions = true, &block)
		begin
			block_data = block.call
			process_data = { "Process" => process_name, "Success" => true }

			if block_data.is_a?(Hash)
				self.send_data(block_data.merge(process_data))
			else
				self.send_data(process_data)
			end

		rescue Exception => e
			lines = e.backtrace.reject{|s| s.include?("/gems/") }
			error_message = "#{ e.message } : #{ lines.first }"

			process_data = { "Process" => process_name, "Success" => false,
				"Error Message" => error_message }

			self.send_data(process_data)

			raise e if preserve_exceptions
		end
	end
end