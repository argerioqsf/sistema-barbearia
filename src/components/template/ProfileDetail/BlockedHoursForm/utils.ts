export type Mode = 'blocked' | 'work'

export function minutesOf(d: Date) {
  return d.getHours() * 60 + d.getMinutes()
}

export function startOfWeek(d: Date) {
  const copy = new Date(d)
  const day = copy.getDay()
  copy.setHours(0, 0, 0, 0)
  copy.setDate(copy.getDate() - day)
  return copy
}

export function dayLabel(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit' })
}

export function formatHM(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function computeLanes(blocks: { start: Date; end: Date }[]) {
  type LaneItem = { idx: number; startMin: number; endMin: number }
  const items: LaneItem[] = blocks.map((blk, idx) => ({
    idx,
    startMin: blk.start.getHours() * 60 + blk.start.getMinutes(),
    endMin: blk.end.getHours() * 60 + blk.end.getMinutes(),
  }))
  const sorted = [...items].sort((a, b) =>
    a.startMin === b.startMin ? b.endMin - a.endMin : a.startMin - b.startMin,
  )
  let laneEnds: number[] = []
  let group: number[] = []
  let groupMax = 0
  const assigned: Record<number, { lane: number; lanes: number }> = {}
  function flush() {
    if (!group.length) return
    for (const i of group) assigned[i].lanes = Math.max(groupMax, 1)
    group = []
    laneEnds = []
    groupMax = 0
  }
  for (const it of sorted) {
    if (laneEnds.length > 0 && laneEnds.every((e) => e <= it.startMin)) flush()
    let lane = laneEnds.findIndex((e) => e <= it.startMin)
    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(it.endMin)
    } else {
      laneEnds[lane] = it.endMin
    }
    assigned[it.idx] = { lane, lanes: 0 }
    group.push(it.idx)
    groupMax = Math.max(groupMax, laneEnds.length)
  }
  flush()
  return assigned
}
