let tableToFill = document.getElementById('table-to-fill');
let search = document.getElementById('search');
let sorryMsg = document.querySelector('.not-found');
let delay;

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(elems => {
      fillTable(tableToFill, elems);
      document.addEventListener('click', (event) => {
        sortTable(event, tableToFill, elems)
      });
      search.oninput = (event) => {
        clearTimeout(delay);
        delay = setTimeout(function () {
          filterTable(tableToFill, elems, event.target.value);
        }.bind(this), 500);
      }
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

let prevName;

function sortTable(event, table, data) {
  if (event.target.tagName !== 'TH') return;

  let name = event.target.textContent;
  let isNumeric = name === 'userId' || name === 'id';

  // If is second click - sort descending
  if (prevName === name) {
    if (isNumeric) {
      data.sort((a, b) => b[name] - a[name]);
    } else {
      sortStringArray(data, name, true);
    }
    prevName = '';

  } else {
    prevName = name;
    if (isNumeric) {
      data.sort((a, b) => a[name] - b[name]);
    } else {
      sortStringArray(data, name, false);
    }
  }

  tableToFill.innerHTML = '';
  fillTable(tableToFill, data);
}

function sortStringArray(arr, colName, isDesc) {
  arr.sort((a, b) => {
    if (a[colName] > b[colName]) {
      return isDesc ? -1 : 1;
    } else if (a[colName] < b[colName]) {
      return isDesc ? 1 : -1;
    } else {
      return 0;
    }
  })
}

function filterTable(table, data, searchStr) {
  if (searchStr.length < 3) return;

  sorryMsg.classList.remove('shown');

  let filteredData = data.filter(item => {
    let checker = false;

    for (let value of Object.values(item)) {
      let stringVal = value.toString();
      if (stringVal.includes(searchStr)) {
        checker =  true;
      }
    }

    return checker;
  });

  if (!filteredData[0]) {
    sorryMsg.classList.add('shown');
  }

  tableToFill.innerHTML = '';
  fillTable(tableToFill, filteredData);
}