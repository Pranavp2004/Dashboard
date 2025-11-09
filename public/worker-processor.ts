self.onmessage = function(e){
  const { rate, batch } = e.data
  setInterval(()=>{
    const pts = []
    for(let i=0;i<batch;i++){
      pts.push({ timestamp:Date.now(), value: Math.random()*100-50, category: 'c' + ((Date.now()+i)%5) })
    }
    postMessage(pts)
  }, rate)
}
