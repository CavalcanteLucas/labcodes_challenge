
async function fetchLog(){
  // getting log for quantity changes 
    const api_url = "http://127.0.0.1:8000/api/inventory/log/";
    const response = await fetch(api_url);
    const log = await response.json();
    return log;
  }
  
async function getIO(product){
  
    // export default getValues;
    var date = new Date();
    const today = date;
    var today_string = dateToString(today);
    date.setDate(date.getDate()-1)
    const yesterday = date;
    var yesterday_string = dateToString(yesterday);
    date.setDate(date.getDate()-1)
    const beforeYesterday = date;
    var beforeYesterday_string = dateToString(beforeYesterday);
  
    fetchLog().then(log => {
      // i/o values for 3 past days
      let today_income=0;
      let today_outcome=0;
      let yesterday_income=0;
      let yesterday_outcome=0;
      let beforeYesterday_income=0;
      let beforeYesterday_outcome=0;
  
      let filteredLog = log.filter(it => 
        it.code == product.code);
  
      const todayLog           = filteredLog.filter(it => 
        dateConvertFormat(it.date) == today_string);
      const yesterdayLog       = filteredLog.filter(it => 
        dateConvertFormat(it.date) == yesterday_string);
      const beforeYesterdayLog = filteredLog.filter(it => 
        dateConvertFormat(it.date) == beforeYesterday_string);
  
      if (todayLog.length) {
        today_income            = todayLog.map(income).reduce(sum);
        today_outcome           = todayLog.map(outcome).reduce(sum);
      }
      if (yesterdayLog.length) {
        yesterday_income        = yesterdayLog.map(income).reduce(sum);
        yesterday_outcome       = yesterdayLog.map(outcome).reduce(sum);
      }
      if (beforeYesterdayLog.length) {
        beforeYesterday_income  = beforeYesterdayLog.map(income).reduce(sum);
        beforeYesterday_outcome = beforeYesterdayLog.map(outcome).reduce(sum);
      }
  
      console.log(today_income)
      return today_income
      // console.log(today_outcome)
      // console.log(yesterday_income)
      // console.log(yesterday_outcome)
      // console.log(beforeYesterday_income)
      // console.log(beforeYesterday_outcome)
  
    });
  }