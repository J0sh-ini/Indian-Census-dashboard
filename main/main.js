let totalData=[];
let ruralData=[];
let urbanData=[];
let perHouse=[];
let pieChart1;
let pieChart2;
let pieChart3;
let pieChart4;
const totalPop=document.getElementById('total-population');
const totalMale=document.getElementById('total-males');
const totalFemale=document.getElementById('total-females');
const totalArea=document.getElementById('total-area');
const avgHouse=document.getElementById('total-house');
readData();
const stateName=document.getElementById('location-select');
stateName.addEventListener('change',()=>
    {   
        createCharts();
    }
);
async function readData() {
    let jsonFile=await fetch("../database/data.json");
    if(!jsonFile)
    {    throw new Error("error reading data");
    }
    const data=await jsonFile.json();
    data.forEach(element => {
        if(element["type"]==="Total")
            totalData.push(element);
        else if(element["type"]==="Rural")
            ruralData.push(element);
        else 
            urbanData.push(element);
        
    });
    createBar();
    createLineChart();
   // createBubble();
    createCharts();
   
}
function createCharts()
{   let i;
    const name=stateName.value.toLowerCase();
    for(i=0;i<36;i++)
    {    if(name===totalData[i]["name"].toLowerCase())
            break;

    }
        avgHouse.innerHTML=perHouse[i];
        totalPop.innerHTML=totalData[i]["Persons"].toLocaleString('en-IN');
        totalFemale.innerHTML=totalData[i]["Females"].toLocaleString('en-IN');
        totalMale.innerHTML=totalData[i]["Males"].toLocaleString('en-IN');
        totalArea.innerHTML=totalData[i]["area"].toLocaleString('en-IN')+' Sq.Km';
        pieCharts(totalData[i]);
        pieCharts3(ruralData[i]);
        pieCharts4(urbanData[i]);
        pieCharts2(ruralData[i],urbanData[i]);
}
/*function createBubble() {
    let bubdata = [];
    for (let i = 0; i < totalData.length; i++) {
        bubdata.push({
            x: i, // Use index as x value for now
            y: (ruralData[i]["Persons"] - urbanData[i]["Persons"])/1000,
            r: Math.sqrt(totalData[i]["Persons"]) / 350
        });
    }
    const ctx = document.getElementById("bubbleChart").getContext('2d');

    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Population Analysis',
                data: bubdata,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear', // Specify x axis as linear
                    position: 'bottom',
                    ticks: {
                        callback: function(value) {
                            return totalData[value]["name"]; // Display state name
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Rural - Urban Population Difference'
                    }
                }
            },
            plugins: {
                tooltip: { // Add tooltip configuration
                    callbacks: {
                        label: function(context) {
                            return context.dataset.data[context.dataIndex].label; // Display state name on hover
                        }
                    }
                },title: {
                    display: true,
                    text: 'State Population Analysis',
                    font: { size: 18 }
                }
            }
        }
    });
}*/
function createLineChart()
{
      const ctx = document.getElementById('lineChart').getContext('2d');
        let names=[];
        let x=[],y=[],z=[];
        for(let i=1;i<totalData.length;i++)
        {
            names.push(totalData[i]["name"]);
            x.push(totalData[i]["Persons"]);
            y.push(ruralData[i]["Persons"]);
            z.push(urbanData[i]["Persons"]);
        }
        // 4. Create the chart configuration
        new Chart(ctx, {
            type: 'line',
            data: {
                // Labels for the X-axis
                labels: names,
                
                // The datasets array contains the data for each line
                datasets: [
                    {
                        label: 'Total Population',
                        data: x,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Rural population',
                        data: y,
                        borderColor: 'rgb(255, 159, 64)',
                        tension: 0.1
                    },
                    {
                        label: 'Urban population',
                        data: z,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Total vs Rural vs Urban Population',
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Population'
                        }
                    },
                    x: {
                         title: {
                            display: true,
                            text: 'States'
                        }
                    }
                }
            }
        });
}
function createBar()
{   
    let names=[];
    totalData.forEach(element=>{
        perHouse.push((element["Persons"]/element["no_households"]).toFixed(3));
        names.push(element["name"]);

    });
    const ctx = document.getElementById('barChart').getContext('2d');
const myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [{
            label: 'Persons',
            data: perHouse,
            backgroundColor: [
                'rgba(255, 153, 0, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(0, 19, 162, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(0, 168, 8, 1)'
            ],
            borderColor: [
                'rgba(255, 153, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 19, 162, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 168, 8, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title:{
                    display:true,
                    text: 'Number of residents per household'
                }
            },
            x:
            {
                title:{
                    display:true,
                    text: 'States of India',
                    size : 30,
                    weight:'bold'
                }
            }
        },
        plugins :{
            responsive:true,
            maintainAspectRation:false,
            legend:{
                display:false
            },
            title:{
                display:true,
                text:'Number of residents per household across states',
                color:'black',
                position:'top',
                font: {
                    size:18,
                    weight:'bold'
                }
                }
            
        }
    }
});
}
function pieCharts(state)
{   if(pieChart1)
    pieChart1.destroy();
    const men=state["Males"];
    const women=state["Females"];
      const pieCtx = document.getElementById('pieChart1').getContext('2d');
     pieChart1 = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Males', 'Females'],
            datasets: [{
                data: [men, women],
                backgroundColor: ['#007bff', '#f0218cff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true,
                    position:'right'
                 },
                title:{
                display:true,
                text:'Total Population',
                color:'black',
                position:'top',
                font: {
                    size:18,
                    weight:'bold'
                }
                },
                subtitle:
                {
                    display:true,
                    text:'By Gender',
                     color:'black',
                     position:'top',
                     font: {
                    size:14
                }
                }
            }
        }
    });
}
function pieCharts4(state)
{   if(pieChart4)
    pieChart4.destroy();
    const men=state["Males"];
    const women=state["Females"];
      const pieCtx = document.getElementById('pieChart4').getContext('2d');
     pieChart4 = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Males', 'Females'],
            datasets: [{
                data: [men, women],
                backgroundColor: ['#007bff', '#f0218cff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true,
                    position:'right'
                 },
                title:{
                display:true,
                text:'Urban Population',
                color:'black',
                position:'top',
                font: {
                    size:18,
                    weight:'bold'
                }
                },
                subtitle:
                {
                    display:true,
                    text:'By Gender',
                     color:'black',
                     position:'top',
                     font: {
                    size:14
                }
                }
            }
        }
    });
}
function pieCharts3(state)
{   if(pieChart3)
    pieChart3.destroy();
    const men=state["Males"];
    const women=state["Females"];
      const pieCtx = document.getElementById('pieChart3').getContext('2d');
     pieChart3 = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Males', 'Females'],
            datasets: [{
                data: [men, women],
                backgroundColor: ['#007bff', '#f0218cff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true,
                    position:'right'
                 },
                title:{
                display:true,
                text:'Rural Population',
                color:'black',
                position:'top',
                font: {
                    size:18,
                    weight:'bold'
                }
                },
                subtitle:
                {
                    display:true,
                    text:'By Gender',
                     color:'black',
                     position:'top',
                     font: {
                    size:14
                }
                }
            }
        }
    });
}
function pieCharts2(rural,urban)
{
    if(pieChart2)
    pieChart2.destroy();
    const ruralCount=rural["Persons"];
    const urbanCount=urban["Persons"];
      const pieCtx = document.getElementById('pieChart2').getContext('2d');
     pieChart2 = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Rural', 'Urban'],
            datasets: [{
                data: [ruralCount, urbanCount],
                backgroundColor: ['#0ecc25ff', '#00ccffff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true,
                    position:'right'
                 },
                title:{
                display:true,
                text:'Total Population',
                color:'black',
                position:'top',
                font: {
                    size:18,
                    weight:'bold'
                }
                },
                subtitle:
                {
                    display:true,
                    text:'By place of residence',
                     color:'black',
                     position:'top',
                     font: {
                    size:14
                }
                }
            }
        }
});
}
