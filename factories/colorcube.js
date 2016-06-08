var savePixels = require('save-pixels')
var zeros = require('zeros')
var chance = new require('chance')();

var pic = zeros([512,512,3])
var nx = pic.shape[0]
var ny = pic.shape[1]

var seeds = chance.integer({min: 1, max: 5})
while(seeds--){
  var color = [
      chance.integer({min: 1, max: 5}),
      chance.integer({min: 1, max: 5}),
      chance.integer({min: 1, max: 5})
    ]

  var xrange = [chance.integer({min: -100, max: nx}), chance.integer({min: 0, max: nx+100})]
  var yrange = [chance.integer({min: -100, max: ny}), chance.integer({min: 0, max: ny+100})]
  xrange = xrange.sort(function(a, b){ return a - b})
  yrange = yrange.sort(function(a, b){ return a - b})
  var boxRange = [chance.integer({min: 1, max: 100}), chance.integer({min: 1, max: 1500})]
  boxRange = boxRange.sort(function(a, b){ return a - b})
  var boxes = chance.integer({min: boxRange[0], max: boxRange[1]})

  while(boxes--){
    var cursor = [chance.integer({min: xrange[0], max: xrange[1]}), chance.integer({min: yrange[0], max: yrange[1]})]
    var radius = chance.integer({min: 1, max: 150})
    for(var x = radius*-1; x < radius*2; x++){
      for(var y = radius*-1; y < radius*2; y++){
        for(var c = 0; c < color.length; c++){
          var last = pic.get(cursor[0]+x,cursor[1]+y,c)
          pic.set(cursor[0]+x,cursor[1]+y,c,last+color[c])
        }
      }
    }
  }
}
savePixels(pic, "png").pipe(process.stdout)