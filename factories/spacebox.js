var savePixels = require('save-pixels')
var zeros = require('zeros')
var chance = new require('chance')();


var pic = zeros([512,512])
var nx = pic.shape[0]
var ny = pic.shape[1]
var boxes = chance.integer({min:1, max:50})
while(boxes--){
  var color = chance.integer({min:1, max:25})
  var paths = chance.integer({min: 50, max: 5000})
  var xrange = [chance.integer({min: nx*-1, max: nx*2}), chance.integer({min: nx*-1, max: nx*2})]
  var yrange = [chance.integer({min: ny*-1, max: ny*2}), chance.integer({min: ny*-1, max: ny*2})]
  xrange = xrange.sort(function(a, b){ return a - b})
  yrange = yrange.sort(function(a, b){ return a - b})
  var cursor = [chance.integer({min: xrange[0], max: xrange[1]}), chance.integer({min: yrange[0], max: yrange[1]})]
  while(paths--){
    var path = randomPath()
    while(path[2]--){
      if(cursor[0] < xrange[0] ||
        cursor[0] > xrange[1] ||
        cursor[1] < yrange[0] ||
        cursor[1] > yrange[1]) cursor = [chance.integer({min: xrange[0], max: xrange[1]}), chance.integer({min: yrange[0], max: yrange[1]})]
      cursor[0] += path[0]
      cursor[1] += path[1]
      
      var last = pic.get(cursor[0], cursor[1])
      if(last < 255) last += color
      else last = 255

      pic.set(cursor[0], cursor[1], last)
    }
  }
}
savePixels(pic, "png").pipe(process.stdout)


function randomPath(){
  var headingX = Math.random()
  var headingY = Math.random()
  if(headingX < .33) headingX = -1
  else if(headingX < .66) headingX = 0
  else headingX = 1
  if(headingY < .33) headingY = -1
  else if(headingY < .66) headingY = 0
  else headingY = 1

  var iterations = Math.round(Math.random() * 250)
  return [headingX, headingY, iterations]
}