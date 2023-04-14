let tableToFill = document.getElementById('table-to-fill');

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

    for (let key in item) {
      let el = document.createElement('td');
      el.textContent = item[key];
      row.appendChild(el);
    }

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
}

let previousColumn;
let isDescending = false;

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
      sortStringArray(data, currentColumn, isDescending);
    }
    previousColumn = '';
  } else {
    if (isNumericColumn) {
      data.sort((a, b) => a[currentColumn] - b[currentColumn]);
    } else {
      sortStringArray(data, currentColumn, isDescending);
    }
  }

  tableToFill.innerHTML = '';
  fillTable(tableToFill, data);
}

function sortStringArray(arr, colName, isDesc) {
  if (isDesc) {
    arr.sort((a, b) => {
      if (a[colName] > b[colName]) {
        return -1;
      } else if (a[colName] < b[colName]) {
        return 1;
      } else {
        return 0;
      }
    })
  } else {
    arr.sort((a, b) => {
      if (a[colName] < b[colName]) {
        return -1;
      } else if (a[colName] > b[colName]) {
        return 1;
      } else {
        return 0;
      }
    })
  }
}