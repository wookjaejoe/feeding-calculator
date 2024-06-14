function weeksFrom(months: number) {
  return months * 365 / 12 / 7
}

function monthsFrom(weeks: number) {
  return weeks * 7 * 12 / 365
}

let multipleByWeeks = new Map()
multipleByWeeks.set(4.3, 150)
multipleByWeeks.set(12.8, 150)
multipleByWeeks.set(17.1, 120)
multipleByWeeks.set(25.7, 120)
multipleByWeeks.set(30, 100)
multipleByWeeks.set(38.5, 90)
multipleByWeeks.set(42.8, 85)
multipleByWeeks.set(52, 75)

class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  includes(value) {
    return value >= this.start && value <= this.end;
  }
}

Range.prototype.toString = function() {
  return `${this.start}..${this.end}`
}

let feedingCountByMonths = new Map()
feedingCountByMonths.set(1, new Range(6, 10))
feedingCountByMonths.set(2, new Range(6, 10))
feedingCountByMonths.set(3, new Range(4, 8))
feedingCountByMonths.set(4, new Range(4, 8))
feedingCountByMonths.set(5, new Range(4, 6))
feedingCountByMonths.set(6, new Range(4, 6))
feedingCountByMonths.set(7, new Range(3, 5))
feedingCountByMonths.set(8, new Range(3, 5))
feedingCountByMonths.set(9, new Range(2, 4))
feedingCountByMonths.set(10, new Range(2, 4))
feedingCountByMonths.set(11, new Range(2, 4))
feedingCountByMonths.set(12, new Range(2))


// calculate 함수는 x 값을 인자로 받아서, map의 key 값이 x와 가장 가까운 entry의 value를 반환한다.
function getMultiple(weeks: number): number {
  // Map의 키 값을 배열로 변환
  const keys = Array.from(multipleByWeeks.keys());

  // 가장 가까운 키 찾기
  let closestKey = keys.reduce((prev, curr) => {
    return (Math.abs(curr - weeks) < Math.abs(prev - weeks) ? curr : prev);
  });

  // 해당 키의 값 반환
  return multipleByWeeks.get(closestKey);
}


export function calculateFeedingAmount(weeks: number, weight: number): number {
  return getMultiple(weeks) * weight
}

export function getFeedingCount(weeks: number): number {
  const months = monthsFrom(weeks)
  const keys = Array.from(feedingCountByMonths.keys());

  // 가장 가까운 키 찾기
  let closestKey = keys.reduce((prev, curr) => {
    return (Math.abs(curr - months) < Math.abs(prev - months) ? curr : prev);
  });

  return feedingCountByMonths.get(closestKey);
}
