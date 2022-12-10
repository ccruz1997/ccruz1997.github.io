async function getData() {
  try {
    const url = 'https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json';
    const data = await fetch(url);
    const jsonData = await data.json();
    console.log('Number of items available', jsonData.length);
    return jsonData;
  } catch (err) {
    console.log('Request failed', err);
  }
};

function initChart(chart, object){
  const labels = Object.keys(object);
  const info = Object.keys(object).map((item) => object[item].length);
  const data = {
    labels: labels,
    datasets: [{
      label:'PG County Payments Made | Per Agency',
      backgroundColor: ['rgba(142,202,230)',
                        'rgba(251, 133, 0)',
                        'rgba(2, 48, 71)',
                        'rgba(255, 183, 3)',
                        'rgba(36, 16, 35)',
                        'rgba(163, 50, 11)',
                        'rgba(213, 230, 141)',
                        'rgba(25, 64, 0)',
                        'rgba(63, 200, 70)',
                        'rgba(0,255,0)',
                        'rgba(58,134,255)',
                        'rgba(131,56,236)',
                        'rgba(255,0,110)',
                        'rgba(251,86,7)',
                        'rgba(0,86,7)'
    ],
                        

      data: info
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { 
        padding: {
          left: 100,
          right: 100
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            fontSize: 16
          }
        }]
      }
    }
  };  

  return new Chart(
    chart,
    config
  );
};

function shapeDataForChart(array, endpoint) {
    return array.reduce((collection,item) => {
        if (!collection[item.agency]){
            collection[item.agency] = [item];
        } else {
            collection[item.agency].push(item);
        }
        return collection;
    },{});
}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}


function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}

function chartRefresh(chart) {
  chart.update();
  console.log('success!')
}


async function MainEvent() {
  const chartTarget = document.querySelector('#myChart');
  const chartData = await getData();
  const shapedData = shapeDataForChart(chartData);
  const refreshButton = document.getElementById('refresh_button')
  let myChart = initChart(chartTarget, shapedData);
  console.log(shapedData);

  refreshButton.addEventListener('click', (SubmitEvent) => {
    console.log('button fired!');
    chartRefresh(myChart);
  })



}

document.addEventListener('DOMContentLoaded', async () => MainEvent());