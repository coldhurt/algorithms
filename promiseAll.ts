class MyPromise {
  static all(ps: Promise<any>[]) {
    return new Promise(function(resolve: Function, reject: Function) {
      const res: any = []
      const _resolve = (success: any, index: number) => {
        res[index] = success
        if (res.length === ps.length) {
          resolve(res)
        }
      }
      const _reject = (failure: any) => {
        reject(failure)
      }
      ps.forEach((p: Promise<any>, index) => {
        p.then(res => _resolve(res, index), _reject).catch(_reject)
      })
    })
  }
}

const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 100)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 50)
})

MyPromise.all([p1, p2])
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log('err: ' + err)
  })

export default MyPromise
