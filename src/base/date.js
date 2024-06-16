
Date.prototype.plus = function (days: number) {
  const newDate = new Date(this);
  newDate.setDate(this.getDate() + days);
  return newDate;
}

Date.prototype.minus = function (days: number): Date {
  return this.plus(-days)
}
