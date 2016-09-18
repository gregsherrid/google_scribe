require "net/http"
require "net/https"
require "uri"

data = {
	"Task" => rand(1000),
	"Notes" => "Long term class"
}

uri = URI.parse("https://script.google.com/macros/s/AKfycbzs88TTUGyhuWRkkKgh8DYtASrXhV3_qyo2wdExEPXb9PpTJmc/exec")
req = Net::HTTP::Post.new(uri.path)

https = Net::HTTP.new(uri.host, uri.port)
https.use_ssl = true

req.set_form_data(data)
res = https.request(req)
