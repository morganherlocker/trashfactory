var savePixels = require('save-pixels')
var zeros = require('zeros')
var d3 = require('d3')
var chance = new require('chance')()

var pic = zeros([512,512,3])
var nx = pic.shape[0]
var ny = pic.shape[1]
var nz = pic.shape[2]
var palette = []
var colors = 256
while(colors--){
  palette.push([(colors*19)%255, (colors*31)%255, (colors*27)%255])
}

var pt = [0.3750001200618655, -0.2166393884377127]
var size =  0.000000000009 * Math.random()
var iterations = 10000000
var xscale = d3.scale.linear()
  .domain([0, nx])
  .range([pt[0] - size, pt[0] + size])
var yscale = d3.scale.linear()
  .domain([0, ny])
  .range([pt[1] - size, pt[1] + size])

for(var x = 0; x < nx; x++){
  for(var y = 0; y < ny; y++){
    x0 = xscale(x)
    y0 = yscale(y)
    var xval = 0
    var yval = 0
    var i = 0
    var iMax = iterations
    while ( xval*xval + yval*yval < 2*2  &&  i < iMax )
    {
      var xTemp = xval*xval - yval*yval + x0
      yval = 2*xval*yval + y0
      xval = xTemp
      i++
    }

    var color = palette[i % palette.length]
    for(var c = 0; c < color.length; c++){
      pic.set(x,y,c,color[c])
    }
  }
}

savePixels(pic, "png").pipe(process.stdout)