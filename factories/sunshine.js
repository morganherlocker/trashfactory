var savePixels = require('save-pixels')
var zeros = require('zeros')
var chance = new require('chance')();


var pic = zeros([512,512])
var nx = pic.shape[0]
var ny = pic.shape[1]
var color = chance.integer({min: 1, max: 200})
var paths = chance.integer({min: 1, max: 10000})

var xrange = [chance.integer({min: -10, max: nx}), chance.integer({min: 0, max: nx+10})]
var yrange = [chance.integer({min: -10, max: ny}), chance.integer({min: 0, max: ny+10})]
xrange = xrange.sort(function(a, b){ return a - b})
yrange = yrange.sort(function(a, b){ return a - b})
var cursor = [chance.integer({min: xrange[0], max: xrange[1]}), chance.integer({min: yrange[0], max: yrange[1]})]
while(paths--){
  var path = randomPath()
  while(path[2]--){
    if(cursor[0] < 0 ||
      cursor[0] > nx ||
      cursor[1] < 0 ||
      cursor[1] > ny) cursor = [chance.integer({min: xrange[0], max: xrange[1]}), chance.integer({min: yrange[0], max: yrange[1]})]
    cursor[0] += path[0]
    cursor[1] += path[1]
    
    var last = pic.get(cursor[0], cursor[1])
    if(last < 255) last += color
    else last = 255

    pic.set(cursor[0], cursor[1], last)
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