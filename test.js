// Function to fetch and populate data from the Sheetsu API

const currentDateTime = moment();
const formattedDateTime = currentDateTime.format("MM/DD/YYYY"); 
document.getElementById("random").textContent = formattedDateTime;

// function fetchData() {
//   console.log(currentDateTime.format("MM/DD/YYYY"));
//   let url =
//     "https://api.sheety.co/84266a79fba1fe4d2512eccd7c54eced/stemClub/formData?filter[computerDate]=" +
//     currentDateTime.format("MM/DD/YYYY");
//   fetch(url)
//     .then((response) => response.json())
//     .then((json) => {
//       console.log(json.formData);
//       // Call a function to create a table from the fetched data
//       createTable(json.formData);
//     });
// }

// // Function to create a table from the fetched data
// function createTable(data) {
//   // Get a reference to the div where you want to place the table
//   const tableDiv = document.getElementById("table-div");

//   // Create a table element
//   const table = document.createElement("table");

//   // Create a header row
//   const headerRow = table.insertRow(0);
//   console.log(data)
//   for (let key in data[0]) {
//     if (data[0].hasOwnProperty(key)) {
//       // Check if the property is a direct property of the object
//       if (key !== "computerDate" && key !== "id") {
//         // Replace 'columnToRemove1' and 'columnToRemove2' with the actual column names to remove
//         const th = document.createElement("th");
//         // Rename the header here if needed
//         if (key === "studentId") {
//           th.innerHTML = "Student ID"; // Replace 'oldHeader1' and 'New Header 1' with the actual header names
//         } else if (key === "studentName") {
//           th.innerHTML = "Student Name"; // Replace 'oldHeader2' and 'New Header 2' with the actual header names
//         } else if (key === "date") {
//           th.innerHTML = "Date"; // Replace 'oldHeader2' and 'New Header 2' with the actual header names
//         } else {
//           th.innerHTML = key;
//         }
//         headerRow.appendChild(th);
//       }
//     }
//   }

//   // Create rows for each data item
//   for (let i = 0; i < data.length; i++) {
//     const row = table.insertRow(i + 1);
//     for (let key in data[i]) {
//       if (data[i].hasOwnProperty(key)) {
//         if (key !== "computerDate" && key !== "id") {
//           // Remove the specified columns
//           const cell = row.insertCell();
//           // Rename the cell value here if needed
//           if (key === "oldHeader1") {
//             cell.innerHTML = "New Value 1"; // Replace 'oldHeader1' and 'New Value 1' with the actual header names
//           } else if (key === "oldHeader2") {
//             cell.innerHTML = "New Value 2"; // Replace 'oldHeader2' and 'New Value 2' with the actual header names
//           } else {
//             cell.innerHTML = data[i][key];
//           }
//         }
//       }
//     }
//   }

//   const tableStyle = `
//             table {
//                 width: 100%;
//                 border-collapse: collapse;
//                 border: 1px solid #ccc;
//             }
//             th {
//                 background-color: #f2f2f2;
//                 color: #333;
//                 font-weight: bold;
//                 padding: 10px;
//                 border: 1px solid #ccc;
//                 text-align: left;
//             }
//             tr:nth-child(even) {
//                 background-color: #f9f9f9;
//             }
//             tr:nth-child(odd) {
//                 background-color: #fff;
//             }
//             td {
//                 padding: 10px;
//                 border: 1px solid #ccc;
//                 text-align: left;
//             }
//             `;

//   // Create a <style> element and set the CSS class
  // const styleElement = document.createElement("style");
  // styleElement.type = "text/css";
  // styleElement.appendChild(document.createTextNode(tableStyle));
  // document.head.appendChild(styleElement);

  // Append the table to your document or target container
  // document.body.appendChild(table);

  // row.className = 'table-row';
  // timestampCell.className = 'table-cell';
  // schoolIDCell.className = 'table-cell';
  // nameCell.className = 'table-cell'

  // Append the table to the div
  // tableDiv.appendChild(table);
// }

// Get tab links and tab contents
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

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

// Initialize the first tab as active
tabLinks[1].classList.add('active');
tabContents[1].classList.add('active');


const start = () => {
  gapi.client.init({
    'apiKey': 'AIzaSyDsgL-6Gag7-UZPcby23wB0DDhcCJub_KE  ',
    'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  }).then(() => {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1FPOuToN-Xdun8cBq1dW2cFt3CgJFifQxvjFBf313FVQ',
      range: 'A:A', // for example: List 1!A1:B6
    })
  }).then((response) => {
    // parse the response data
    // console.log(response)
    const loadedData = response.result.values;

    // populate the HTML table with the data
    const table = document.getElementsByTagName('table')[0];
    
    // add column headers
    const columnHeaders = document.createElement('tr');
    columnHeaders.innerHTML = `<th>Student ID</th>
<th>Student Name</th><th>Date</th>`;
    table.appendChild(columnHeaders);

    // add table data rows
    for (let i = 1; i < loadedData.length; i++) {
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `<td>${loadedData[i][0]}</td>
<td>${loadedData[i][1]}</td><td>${loadedData[i][3]}</td>`;
      table.appendChild(tableRow);
    }
  }).catch((err) => {
  	console.log(err.error.message);
  });

  
};

gapi.load('client', start);
