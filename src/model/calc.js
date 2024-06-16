function weeksFrom(months: number) {
  return months * 365 / 12 / 7
}

export function monthsFrom(weeks: number) {
  return weeks * 7 * 12 / 365
}

let multipleByWeeks = new Map()
multipleByWeeks.set(4.3, 150)
multipleByWeeks.set(12.8, 150)
multipleByWeeks.set(17.1, 120)
multipleByWeeks.set(25.7, 120)
multipleByWeeks.set(30, 100)  // 7
multipleByWeeks.set(38.5, 90)  // 9
multipleByWeeks.set(42.8, 85)  // 10
multipleByWeeks.set(52, 75)  // 12

class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  includes(value) {
    return value >= this.start && value <= this.end;
  }

  get items() {
    let itemsArray = [];
    for (let i = this.start; i <= this.end; i++) {
      itemsArray.push(i);
    }
    return itemsArray;
  }
}

Range.prototype.toString = function () {
  return this.start === this.end ? this.start.toString() : `${this.start}~${this.end}`
}


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

/*
신생아
1-4
5-6 이유식 초기
7-8 이유식 중기
9-11 이유식 후기
 */

export function getFeedingAmount(month: number, weight: number) {
  let multiple = 0
  if (month < 3) {
    multiple = 150
  } else if (month < 7) {
    multiple = 120
  } else if (month < 9) {
    multiple = 90 // 7-8개월 중기 이유식
  } else if (month < 12) {
    multiple = 70 // 9-12개월 후기 이유식
  } else {
  }

  return Math.min(multiple * weight, 960)
}

export function getFeedingCount(month: number): Range | null {
  if (month < 1) {
    return new Range(8, 12)  // 신생아
  } else if (month < 2) {
    return new Range(8, 12)  // 2개월 전
  } else if (month < 4) {
    return new Range(5, 8)  // 4개월 전
  } else if (month < 7) {
    return new Range(4, 6)  // 7개월 전
  } else if (month < 9) {
    return new Range(3, 5)  // 7-8개월 (중기이유식)
  } else if (month < 12) {
    return new Range(2, 3)  // 9-12개월 (후기이유식)
  } else {
    return new Range(2, 2)
  }
}


export function getLink(month: number): String {
  if (month < 1) {
    return "https://www.childcare.go.kr/?menuno=422"
  } else if (month < 4) {
    return "https://www.childcare.go.kr/?menuno=429"
  } else if (month < 7) {
    return "https://www.childcare.go.kr/?menuno=437"
  } else if (month < 10) {
    return "https://www.childcare.go.kr/?menuno=443"
  } else if (month < 13) {
    return "https://www.childcare.go.kr/?menuno=449"
  } else if (month < 25) {
    return "https://www.childcare.go.kr/?menuno=457"
  } else {
    return "https://www.childcare.go.kr/?menuno=464"
  }
}
