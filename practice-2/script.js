let tableToFill = document.getElementById('table-to-fill');

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(elems => {
      fillTable(tableToFill, elems);
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
