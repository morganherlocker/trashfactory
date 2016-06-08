var request = require('request')

var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=8523e2f81c43f7b49191a50ed6ba303f&tags=bike'
request(url, function(err, res, body){
  body = body.split('jsonFlickrApi(').join('').split().pop()
  console.log(body)
})