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
}

function uniquePayees(data){
    reply = data.map((item) => item.payee_name).filter((value, index, self) => self.indexOf(value) === index);
    return reply;
} 

async function MainEvent() {
  let response = await getData();
  response = response.filter((item) => Boolean(item.agency === 'POLICE')).filter((item) => item.amount > 0);
  console.log(response);

  payees = uniquePayees(response);
  console.log(payees);

  console.log(byPayee(response,'COMCAST'));
}

document.addEventListener('DOMContentLoaded', async () => MainEvent());