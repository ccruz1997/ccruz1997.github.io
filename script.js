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

/*
function uniquePayees(data){
    reply = data.map((item) => item.payee_name).filter((value, index, self) => self.indexOf(value) === index);
    return reply;
} 

function dataByPayee(data,payees) {
    let newData = data;
    let newPayees = payees;
    let dataOnPayee = new Array(payees.length);
    
    for (i = 0; i < dataOnPayee.length; i++) {
        dataOnPayee[i] = new Array();
    }

    console.log(dataOnPayee);

    newData.forEach(element => {
       dataOnPayee[newPayees.indexOf(element.payee_name)].push(element.amount)
    });

    console.log(dataOnPayee)
    return dataOnPayee;

}
*/
function initChart(chart, object){
  const labels = Object.keys(object);
  const info = Object.keys(object).map((item) => object[item].length);
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: info
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {}
  };  

  return new Chart(
    chart,
    config
  );
};

function shapeDataForChart(array) {
    return array.reduce((collection,item) => {
        if (!collection[item.agency]){
            collection[item.agency] = [item];
        } else {
            collection[item.agency].push(item);
        }
        return collection;
    },{});
}



async function MainEvent() {
  const chartTarget = document.querySelector('#myChart');
  const chartData = await getData();
  const shapedData = shapeDataForChart(chartData);

  initChart(chartTarget, shapedData);
  console.log(shapedData);
/*
  payees = uniquePayees(response);
  amountByPayee = dataByPayee(response,payees)

  labels = payees;
  datasets = amountByPayee;

  console.log(labels);
  console.log(datasets);
  */
}

document.addEventListener('DOMContentLoaded', async () => MainEvent());