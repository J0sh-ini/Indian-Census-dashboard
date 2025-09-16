let dateWiseData=[];
let countryWiseData=[];
const Papa=require('papaparse');
//const path='../database/WHO-COVID-19-global-daily-data.csv'
const path='database/tempLarge.csv'
//240 countries
const fs =require('fs');
function getData()//to extract data from the csv file
{

let totalData=[];
fs.createReadStream(path)
  .pipe(Papa.parse(Papa.NODE_STREAM_INPUT,{header:true}))
  .on("data", (data) => {
    totalData.push(data);

  })
  .on("end", () => {
    console.log("CSV file successfully processed");
    separate(totalData);
  })
  .on("error", (error) => {
    console.log(error);
  });
}
  function separate(totalData)//to separate the data by country name and date
  { let oneDayData=[];
    let oneCountryData=[]
    let countries=[{}];
    let dates=[];
    for(let i=0;i<240;i++)
      countries.push(totalData[i]["Country"]); //extracting 240 country names and storing in array
    for(let i=0;i<240;i++)
   { totalData.forEach(element => {
      if (element["Country"]===countries[i]) //filtering and grouping data by country names
          oneCountryData.push(element);
    });
    countryWiseData.push(oneCountryData);
    oneCountryData=[];
  }
  let len=totalData.length;
  for(let i=0;i<len;i+=240)
    dates.push(totalData[i]["Date_reported"]);// getting different dates
  len/=240;
  for(let i=0;i<len;i++)
   { totalData.forEach(element => {
      if (element["Date_reported"]===dates[i])// filtering and grouping data by dates
          oneDayData.push(element);
    });
    dateWiseData.push(oneDayData);
    oneDayData=[];
  }
  }
getData();
const totalAffected = 50000; // e.g., total cases for the country on the date
    const totalDeaths = 1200;    // e.g., total deaths for the country on the date

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Total Affected', 'Total Deaths'],
            datasets: [{
                data: [totalAffected, totalDeaths],
                backgroundColor: ['#007bff', '#dc3545'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });