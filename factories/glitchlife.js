var savePixels = require('save-pixels')
var zeros = require('zeros')
var chance = new require('chance')();

var size = 512
var pic = zeros([size,size])
var picx = pic.shape[0]
var picy = pic.shape[0]
var finalPic = zeros([picx, picy])

var passes = chance.integer({min: 1, max: 15})
while(passes--){
  var rand = chance.integer({min: 1000, max: 1000000})
  var xrange = [chance.integer({min: picx*-1, max: picx*2}), chance.integer({min: picx*-1, max: picx*2})]
  var yrange = [chance.integer({min: picy*-1, max: picy*2}), chance.integer({min: picy*-1, max: picy*2})]
  xrange = xrange.sort(function(a, b){ return a - b})
  yrange = yrange.sort(function(a, b){ return a - b})

  while(rand--){
    pic.set(chance.integer({min: xrange[0], max: xrange[1]}),chance.integer({min: yrange[0], max: yrange[1]}),1)
  }

  var pics = []
  var steps = chance.integer({min: 100, max: 2000})
  while(steps--){
    pic = stepLife(pic)
    pics.push(pic)
  }

  var increment = chance.integer({min: 5, max: 100})
  for(var i = 0; i<pics.length;i++){
    for(var x = 0; x < picx; x++){
      for(var y = 0; y < picy; y++){
        if(pics[i].get(x,y))
          finalPic.set(x,y, finalPic.get(x,y)+increment)
      }
    }
  }
}

savePixels(finalPic, "png").pipe(process.stdout)

function stepLife(cur_state) {
  var nx = cur_state.shape[0], 
      ny = cur_state.shape[1]
  var next_state = zeros([nx, ny])

  for(var i=1; i<nx-1; ++i) {
    for(var j=1; j<ny-1; ++j) {
      var n = 0
      for(var dx=-1; dx<=1; ++dx) {
        for(var dy=-1; dy<=1; ++dy) {
          if(dx === 0 && dy === 0) {
            continue
          }
          n += cur_state.get(i+dx, j+dy)
        }
      }

      if(n === 3 || n === 3 + cur_state.get(i,j)) {
        next_state.set(i,j,1)
      } else {
        next_state.set(i,j,0)
      }
    }
  }
  return next_state
}