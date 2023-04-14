let tableToFill = document.getElementById('table-to-fill');
let previousColumn;

let isClicked = false;

let isDescending = false;

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(elems => {
      fillTable(tableToFill, elems);
      document.addEventListener('click', (event) => {
        sortTable(event, tableToFill, elems)
      });
    });

function fillTable(table, data) {
  // fill head
  let head = document.createElement('thead');
  head.appendChild(document.createElement('tr'));

  for (let key in data[0]) {
    let th = document.createElement('th');
    th.textContent = key;
    head.rows[0].appendChild(th);
  }
  table.appendChild(head);


  //fill body
  let tbody = document.createElement('tbody')

  data.forEach(item => {
    let row = document.createElement('tr');

    let userId = document.createElement('td');
    userId.textContent = item["userId"];
    let id = document.createElement('td');
    id.textContent = item["id"];
    let title = document.createElement('td');
    title.textContent = item["title"];
    let body = document.createElement('td');
    body.textContent = item["body"];

    row.appendChild(userId);
    row.appendChild(id);
    row.appendChild(title);
    row.appendChild(body);

    tbody.appendChild(row);
  });


  table.appendChild(tbody);
}


function sortTable(event, table, data) {
  if (event.target.tagName !== 'TH') return;

  let currentColumn = event.target.textContent;
  let isNumericColumn = currentColumn === 'userId' || currentColumn === 'id';

  // If is second click - sort descending
  if (previousColumn === currentColumn) {
    isDescending = true;
  } else {
    previousColumn = currentColumn;
    isDescending = false;
  }

  if (isDescending) {
    if (isNumericColumn) {
      data.sort((a, b) => b[currentColumn] - a[currentColumn]);
    } else {
      sortStringArray(data, 'asc');
    }
    previousColumn = '';
  } else {
    if (isNumericColumn) {
      data.sort((a, b) => a[currentColumn] - b[currentColumn]);
    } else {
      sortStringArray(data, 'desc');
    }
  }

  document.querySelector('table').innerHTML = '';
  fillTable(tableToFill, data);
}

function sortStringArray(arr, type) {
  if (type === 'desc') {
    arr.sort((a, b) => {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    })
  } else if (type === 'asc') {
    arr.sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    })
  }
}