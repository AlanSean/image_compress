function limitLoad(loadFn,url,limitNum){
  let totaUrl = [].concat(url);
  let res = [];
  let promiseQueue = totaUrl.splice(0,limitNum).map( (item,index) => {
    res.push(item);
    return index;
  });
  totaUrl.reduce( (last,current,nowIndex) => {
    return last.then( () => {
      return  Promise.race(promiseQueue)
    }).then( fastIndex => {
      promiseQueue[fastIndex] = loadFn(current).then( item => {
        res.push(item);
        return nowIndex
      })
    })
  },Promise.resolve()).then( () => {
    Promise.all(promiseQueue).then(() => {
      console.log('异步队列顺序',url)
      console.log('执行顺序',res)
    })
  })
}