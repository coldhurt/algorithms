function combinationSum(candidates: number[], target: number): number[][] {
  let res: number[][] = []
  candidates = candidates.sort((a, b) => a - b)
  const len = candidates.length
  if (len === 0 || target < candidates[0]) return res
  function dfs(t: number, combine: number[], id: number) {
    if (id === len) {
      return
    }
    if (t === 0) {
      res.push(combine)
      return
    }

    dfs(t, combine, id + 1)
    if (t >= candidates[id])
      dfs(t - candidates[id], [...combine, candidates[id]], id)
  }

  dfs(target, [], 0)
  return res
}