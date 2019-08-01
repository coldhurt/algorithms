interface IMenuItem {
  id: string // current
  pid: string | null // parent id
  child?: IMenuItem[]
}

interface IFunc {
  (arr: IMenuItem[]): IMenuItem[]
}

const findChild = (arr: IMenuItem[], pid: string) => {
  let res = []
  for (let i = 0; i < arr.length; ) {
    if (arr[i].pid === pid) {
      let child = arr.splice(i, 1)[0]
      child.child = [...findChild(arr, child.id)]
      res.push(child)
    } else {
      i++
    }
  }
  return res
}

const sameToTree: IFunc = (arr: IMenuItem[]) => {
  const finalRes = []
  for (let i = 0; i < arr.length; ) {
    if (arr[i].pid === null) {
      let root = arr.splice(i, 1)[0]
      root.child = findChild(arr, root.id)
      finalRes.push(root)
    } else {
      i++
    }
  }
  return finalRes
}

// const data: IMenuItem[] = [
//   {
//     id: 'A',
//     pid: null
//   },
//   {
//     id: 'B',
//     pid: 'A'
//   },
//   {
//     id: 'C',
//     pid: 'B'
//   },
//   {
//     id: 'F',
//     pid: 'A'
//   },
//   {
//     id: 'E',
//     pid: 'D'
//   },
//   {
//     id: 'D',
//     pid: null
//   }
// ]
// console.log(sameToTree(data))

export default sameToTree
