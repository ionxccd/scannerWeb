                // Function to fetch and populate data from the Sheetsu API
                function fetchData() {
                  const currentDateTime = moment();
                  console.log(currentDateTime.format("MM/DD/YYYY"));
                  let url = 'https://api.sheety.co/84266a79fba1fe4d2512eccd7c54eced/stemClub/formData?filter[computerDate]=' + currentDateTime.format("MM/DD/YYYY");
                  fetch(url)
                      .then((response) => response.json())
                      .then(json => {
                          console.log(json.formData)
                          // Call a function to create a table from the fetched data
                          createTable(json.formData);
                      });
                  }

              // Function to create a table from the fetched data
              function createTable(data) {
                  // Get a reference to the div where you want to place the table
                  const tableDiv = document.getElementById("table-div");
                  
                  // Create a table element
                  const table = document.createElement("table");

          // Create a header row
          const headerRow = table.insertRow(0);
          for (let key in data[0]) {
          if (data[0].hasOwnProperty(key)) { // Check if the property is a direct property of the object
              if (key !== 'computerDate' && key !== 'id') { // Replace 'columnToRemove1' and 'columnToRemove2' with the actual column names to remove
              const th = document.createElement("th");
              // Rename the header here if needed
              if (key === 'studentId') {
                  th.innerHTML = 'Student ID'; // Replace 'oldHeader1' and 'New Header 1' with the actual header names
              } else if (key === 'studentName') {
                  th.innerHTML = 'Student Name'; // Replace 'oldHeader2' and 'New Header 2' with the actual header names
              }else if (key === 'date') {
                  th.innerHTML = 'Date'; // Replace 'oldHeader2' and 'New Header 2' with the actual header names
              } else {
                  th.innerHTML = key;
              }
              headerRow.appendChild(th);
              }
          }
          }

          // Create rows for each data item
          for (let i = 0; i < data.length; i++) {
          const row = table.insertRow(i + 1);
          for (let key in data[i]) {
              if (data[i].hasOwnProperty(key)) {
              if (key !== 'computerDate' && key !== 'id') { // Remove the specified columns
                  const cell = row.insertCell();
                  // Rename the cell value here if needed
                  if (key === 'oldHeader1') {
                  cell.innerHTML = 'New Value 1'; // Replace 'oldHeader1' and 'New Value 1' with the actual header names
                  } else if (key === 'oldHeader2') {
                  cell.innerHTML = 'New Value 2'; // Replace 'oldHeader2' and 'New Value 2' with the actual header names
                  } else {
                  cell.innerHTML = data[i][key];
                  }
              }
              }
          }
          }

          const tableStyle = `
              table {
                  width: 100%;
                  border-collapse: collapse;
                  border: 1px solid #ccc;
              }
              th {
                  background-color: #f2f2f2;
                  color: #333;
                  font-weight: bold;
                  padding: 10px;
                  border: 1px solid #ccc;
                  text-align: left;
              }
              tr:nth-child(even) {
                  background-color: #f9f9f9;
              }
              tr:nth-child(odd) {
                  background-color: #fff;
              }
              td {
                  padding: 10px;
                  border: 1px solid #ccc;
                  text-align: left;
              }
              `;

              // Create a <style> element and set the CSS class
              const styleElement = document.createElement("style");
              styleElement.type = "text/css";
              styleElement.appendChild(document.createTextNode(tableStyle));
              document.head.appendChild(styleElement);

              // Append the table to your document or target container
              document.body.appendChild(table);


                  // row.className = 'table-row';
                  // timestampCell.className = 'table-cell';
                  // schoolIDCell.className = 'table-cell';
                  // nameCell.className = 'table-cell'

                  
                  // Append the table to the div
                  tableDiv.appendChild(table);
              }
