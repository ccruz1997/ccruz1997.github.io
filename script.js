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

function injectHTML(list, obj) {
  console.log('fired injectHTML');
  console.log(list);
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';

  const listEl = document.createElement('ol');
  target.appendChild(listEl);
  list.forEach((item) => {
    const el = document.createElement('li');
    el.innerText = item + ' : ' + obj[item].length;
    listEl.appendChild(el);
  });
}
  
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

function filterDataForChart(array, list){
  return array.reduce((collection,item) => {
    if (list.includes(item.agency))
      if (!collection[item.agency]){
          collection[item.agency] = [item];
      } else {
          collection[item.agency].push(item);
      }
      return collection;
  },{});
}



function filterList(array, filterInputValue) {
  return array.filter((item) => {
    const upperCaseName = item.toUpperCase();
    const upperCaseQuery = filterInputValue.toUpperCase();
    return upperCaseName.includes(upperCaseQuery);
  });
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
  let shapedData = shapeDataForChart(chartData);
  const form = document.querySelector('.main_form');
  const target = document.querySelector('#restaurant_list');
  
  let myChart = initChart(chartTarget, shapedData);
  console.log(shapedData);

  currentList = Object.keys(shapedData);

    form.addEventListener('input', (event) => {
    console.log('input:', event.target.value);
    const newFilteredList = filterList(currentList, event.target.value);
    console.log(newFilteredList);
    shapedData = filterDataForChart(chartData, newFilteredList)
    myChart.destroy();
    myChart = initChart(chartTarget, shapedData)
    injectHTML(newFilteredList,shapedData);
   ;
  });

  console.log(chartData)
  console.log(Object.entries(shapedData))
}

document.addEventListener('DOMContentLoaded', async () => MainEvent());