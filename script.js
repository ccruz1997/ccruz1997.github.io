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

async function MainEvent() {
  const response = await getData();
  console.table(response);
}

document.addEventListener('DOMContentLoaded', async () => MainEvent());