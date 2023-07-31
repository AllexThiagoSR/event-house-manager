import EntireDate from '../interfaces/Date';

export default class ExpireTime {
  private _date: Date;

  constructor(date: EntireDate) {
    if (typeof date === 'string') {
      this._date = new Date(date);
    } else {
      this._date = new Date(date.year, date.month - 1, date.day);
    }
  }

  get date() {
    return this._date;
  }

  getTicketExpireTime() {
    const diff = this._date.getTime() - new Date().getTime();
    const days = diff / 1000 / 60 / 60 / 24;
    if (days < 0) { 
      const err = new Error();
      err.name = 'eventHasPassed';
      throw err;
    }
    return Math.ceil(days);
  }
}
