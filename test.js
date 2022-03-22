const should  = require('should');
//const { source_d } = require('./source');
const source = require('./source');
const source_d = source.bind({type: 'd'});
const src = 
{
  date01: "2018-06-01T18:17:12.745+07:00",
  date02: "2018-06-01T18:17:12.745Z",
  date03: "2018-06-01T18:17:12",
  date04: "2018-06-01T18:17:12.745",
  date05: "2018-06-01+07:00",
  date06: "2018-06-01",
  date07: "www.ru; 12-03-2018 года 11:00 часов",
  date08: "2018-05-17 года в 15:00 (по местному времени).",
  date09: "www.ru; 12.03.2018 года 11:00 часов",
  date10: "2018.05.17 года в 15:00 (по местному времени).",
  date11: "www.ru; 12-03-2018 года",
  date12: "2018-05-17 года",
  date13: "www.ru; 12.03.2018 года",
  date14: "2018.05.17 года",
  date15: "1 января 2017 года",
  date16: "11 августа 2018 года",
  date17: "02 дек. 2018 года",
  date18: '"02" ноя. 2018 года',
  date19: "«02» сен. 2018 года",
  date20: "27/03/2018 г. в 10:00 (по московскому времени)"
}

describe('парсинг даты', () => {

  it('01: дата с таймзоной в ISO формате возвращается корректно', done => {
    const result = source_d({ src, options: 'date01' });

    result.should.be.instanceof(String).which.is.equal('2018-06-01T18:17:12.745+07:00');
    done();
  });

  it('02: дата UTC в ISO формате возвращается корректно', done => {
    const result = source_d({ src, options: 'date02' });

    result.should.be.instanceof(String).which.is.equal('2018-06-01T18:17:12.745Z');
    done();
  });

  it('03: дата UTC без Z и без мсек возвращается корректно', done => {
    const result = source_d({ src, options: 'date03' });

    result.should.be.instanceof(String).which.is.equal('2018-06-01T18:17:12.000Z');
    done();
  });

  it('04: дата UTC без Z возвращается корректно', done => {
    const result = source_d({ src, options: 'date04' });

    result.should.be.instanceof(String).which.is.equal('2018-06-01T18:17:12.745Z');
    done();
  });

  it('05: дата с таймзоной без времени возвращается корректно', done => {
    const result = source_d({ src, options: 'date05' });

    result.should.be.instanceof(String).which.is.equal('2018-06-01T00:00:00.000+07:00');
    done();
  });

  it('06: дата без таймзоны и времени возвращается корректно', done => {
    const result = source_d({ src, options: 'date06' });

    result.should.be.instanceof(String).which.is.equal('2018-06-01T00:00:00.000Z');
    done();
  });

  it('07: дата парсится из строки вида [... DD-MM-YYYY ... HH:mm ...]', function(done) {
    const result = source_d({src, options: 'date07'});

    result.should.be.instanceof(String).which.is.equal('2018-03-12T11:00:00.000Z');
    done();
  });

  it('08: дата парсится из строки вида [... YYYY-MM-DD ... HH:mm ...]', function(done) {
    const result = source_d({src, options: 'date08'});

    result.should.be.instanceof(String).which.is.equal('2018-05-17T15:00:00.000Z');
    done();
  });

  it('09: дата парсится из строки вида [... DD.MM.YYYY ... HH:mm ...]', function(done) {
    const result = source_d({src, options: 'date09'});

    result.should.be.instanceof(String).which.is.equal('2018-03-12T11:00:00.000Z');
    done();
  });

  it('10: дата парсится из строки вида [... YYYY.MM.DD ... HH:mm ...]', function(done) {
    const result = source_d({src, options: 'date10'});

    result.should.be.instanceof(String).which.is.equal('2018-05-17T15:00:00.000Z');
    done();
  });

  it('11: дата парсится из строки вида [... DD-MM-YYYY ...]', function(done) {
    const result = source_d({src, options: 'date11'});

    result.should.be.instanceof(String).which.is.equal('2018-03-12T00:00:00.000Z');
    done();
  });

  it('12: дата парсится из строки вида [... YYYY-MM-DD ...]', function(done) {
    const result = source_d({src, options: 'date12'});

    result.should.be.instanceof(String).which.is.equal('2018-05-17T00:00:00.000Z');
    done();
  });

  it('13: дата парсится из строки вида [... DD.MM.YYYY ...]', function(done) {
    const result = source_d({src, options: 'date13'});

    result.should.be.instanceof(String).which.is.equal('2018-03-12T00:00:00.000Z');
    done();
  });

  it('14: дата парсится из строки вида [... YYYY.MM.DD ...]', function(done) {
    const result = source_d({src, options: 'date14'});

    result.should.be.instanceof(String).which.is.equal('2018-05-17T00:00:00.000Z');
    done();
  });

  it('15: дата парсится из строки вида [... D month YYYY ...]', function(done) {
    const result = source_d({src, options: 'date15'});

    result.should.be.instanceof(String).which.is.equal('2017-01-01T00:00:00.000Z');
    done();
  });

  it('16: дата парсится из строки вида [... DD month YYYY ...]', function(done) {
    const result = source_d({src, options: 'date16'});

    result.should.be.instanceof(String).which.is.equal('2018-08-11T00:00:00.000Z');
    done();
  });

  it('17: дата парсится из строки вида [... DD mon. YYYY ...]', function(done) {
    const result = source_d({src, options: 'date17'});

    result.should.be.instanceof(String).which.is.equal('2018-12-02T00:00:00.000Z');
    done();
  });

  it('18: дата парсится из строки вида [... "DD" mon. YYYY ...]', function(done) {
    const result = source_d({src, options: 'date18'});

    result.should.be.instanceof(String).which.is.equal('2018-11-02T00:00:00.000Z');
    done();
  });

  it('19: дата парсится из строки вида [... «DD» mon. YYYY ...]', function(done) {
    const result = source_d({src, options: 'date19'});

    result.should.be.instanceof(String).which.is.equal('2018-09-02T00:00:00.000Z');
    done();
  });

  it('20: дата парсится из строки вида [... DD/MM/YYYY ...]', function(done) {
    const result = source_d({src, options: 'date20'});

    result.should.be.instanceof(String).which.is.equal('2018-03-27T10:00:00.000Z');
    done();
  });

});
