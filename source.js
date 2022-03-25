
// dd-mm-yyyy
const getStructuredDateFromStr = (strDate) => {
    return {
        year: strDate.substr(6),
        month: strDate.substr(3,2),
        day: strDate.substr(0,2),
    };
}

const convertDateFromLocale = (str) => {
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн',
    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
    ];
    const [dayWithStr, monthName, year] = str
        .replaceAll('"', '')
        .replaceAll('«', '')
        .replaceAll('»', '')
        .split(' ');
    // console.log([dayWithStr, monthName.substr(0, 3), year]);
    const day = parseInt(dayWithStr.split(',')[0], 10);
    // console.log(day);
    const month = months.findIndex(m => m === monthName.substr(0, 3));
    return (new Date(Date.UTC(year, month, day))).toISOString();    
}

const converter = {
    'date01': str => str, 
    'date02': str => str, 
    'date03': str => `${str}.000Z`,
    'date04': str => `${str}Z`,
    'date05': (str) => `${str.substr(0, 10)}T00:00:00.000${str.substr(10)}`, 
    'date06': (str) => `${str.substr(0, 10)}T00:00:00.000Z`, 
    'date07': (str) => {
        const array = str.split(' ');
        const dateOb = getStructuredDateFromStr(array[1]);
        return `${dateOb.year}-${dateOb.month}-${dateOb.day}T${array[3]}:00.000Z`;
    }, 
    'date08': (str) => {
        const array = str.split(' ');
        return `${array[0]}T${array[3]}:00.000Z`;
      }, 
    'date09': (str) => {
        const array = str.split(' ');
        const dateOb = getStructuredDateFromStr(array[1]);
        return `${dateOb.year}-${dateOb.month}-${dateOb.day}T${array[3]}:00.000Z`;
      }, 
    'date10': (str) => {
        const array = str.split(' ');
        const date = array[0].replaceAll('.', '-');
        return `${date}T${array[3]}:00.000Z`;
    }, 
    'date11': (str) => {
        const array = str.split(' ');
        const dateOb = getStructuredDateFromStr(array[1]);
        return `${dateOb.year}-${dateOb.month}-${dateOb.day}T00:00:00.000Z`;
      }, 
    'date12': (str) => {
        const array = str.split(' ');
        return `${array[0]}T00:00:00.000Z`;
    }, 
    'date11': (str) => {
        const array = str.split(' ');
        const date = array[1].replaceAll('.', '-');
        const dateOb = getStructuredDateFromStr(date);
        return `${dateOb.year}-${dateOb.month}-${dateOb.day}T00:00:00.000Z`;
    }, 
    'date12': (str) => {
        const array = str.split(' ');
        return `${array[0]}T00:00:00.000Z`;
    }, 
    'date13': str => {
        const array = str.split(' ');
        const dateOb = getStructuredDateFromStr(array[1]);
        return `${dateOb.year}-${dateOb.month}-${dateOb.day}T00:00:00.000Z`;
    }, 
    'date14': str => {
        const array = str.split(' ');
        const date = array[0].replaceAll('.', '-');
        return `${date}T00:00:00.000Z`; 
    },
    'date15': str => convertDateFromLocale(str),
    'date16': str => convertDateFromLocale(str),
    'date17': str => convertDateFromLocale(str),
    'date18': str => convertDateFromLocale(str),
    'date19': str => convertDateFromLocale(str),
    'date20': str => {
        const array = str.split(' ');
        const dateOb = getStructuredDateFromStr(array[0]);
        return `${dateOb.year}-${dateOb.month}-${dateOb.day}T${array[3]}:00.000Z`;
    },
};

const source = ({ src, options }) => {
    const str = src[options];
    const result = converter[options](str);
    console.log(`str:${str}, result: ${result}`);
    return result;
}

module.exports = source;