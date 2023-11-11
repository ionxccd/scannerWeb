// Function to fetch and populate data from the Sheetsu API

const currentDateTime = moment();
const formattedDateTime = currentDateTime.format("MM/DD/YYYY"); 
document.getElementById("random").textContent = formattedDateTime;

const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks[1].classList.add('active');
tabContents[1].classList.add('active');


// Add click event listeners to tab links
tabLinks.forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove the "active" class from all tab links and tab contents
    tabLinks.forEach((tabLink) => tabLink.classList.remove('active'));
    tabContents.forEach((tabContent) => tabContent.classList.remove('active'));

    // Add the "active" class to the clicked tab link and corresponding tab content
    link.classList.add('active');
    tabContents[index].classList.add('active');
  });
});

const start = () => {
  gapi.client.init({
    'apiKey': 'AIzaSyDsgL-6Gag7-UZPcby23wB0DDhcCJub_KE',
    'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  }).then(() => {
      return gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1FPOuToN-Xdun8cBq1dW2cFt3CgJFifQxvjFBf313FVQ',
          range: 'A:D', // for example: List 1!A1:B6
      })
  }).then((response) => {
      // parse the response data
      const loadedData = response.result.values;

      // populate the HTML table with the data
      const table = document.getElementsByTagName('table')[0];

      // add column headers
      const columnHeaders = document.createElement('tr');
      columnHeaders.innerHTML = `<th>Student ID</th>
  <th>Student Name</th><th>Date</th>`;
      table.appendChild(columnHeaders);

      // get the current date
      const currentDate = new Date();

      // add table data rows with dates after the current date
      for (let i = loadedData.length - 1; i >= 1; i--) {
          const rowData = loadedData[i];
          const itemDate = new Date(rowData[2]); // Assuming the date is in the third column

          if (itemDate > currentDate) {
              const tableRow = document.createElement('tr');
              tableRow.innerHTML = `<td>${rowData[0]}</td>
  <td>${rowData[1]}</td><td>${rowData[2]}</td>`;
              table.appendChild(tableRow);
          }
      }
  }).catch((err) => {
      console.log(err.error.message);
  });


  
};

gapi.load('client', start);
