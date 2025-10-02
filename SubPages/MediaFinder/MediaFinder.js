// Handle form submission
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const query = document.getElementById('query').value.trim();
  const fileType = document.getElementById('filetypeSelect').value;
  const resType = document.getElementById('filetypeSelect').selectedOptions[0].dataset.restype || "all";
  const engine = document.getElementById('engineSelect').value;
  const sortBy = document.getElementById('sortBySelect').value;
  const sortOrder = document.getElementById('sortOrderSelect').value;

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  let finalQuery = "";
  if (fileType === "-1") {
    finalQuery = `${query} -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of`;
  } else {
    finalQuery = `${query} +(${fileType}) -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of`;
  }

  let url = "";
  switch (engine) {
    case "google":
      url = (sortBy === "date") ?
        `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}&tbs=qdr:m,sbd:${sortOrder === 'desc' ? 1 : 0}` :
        `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`;
      break;

    case "startpage":
      url = (sortBy === "date") ?
        `https://www.startpage.com/do/dsearch?query=${encodeURIComponent(finalQuery)}&with_date=1&sort=${sortOrder}` :
        `https://www.startpage.com/do/dsearch?query=${encodeURIComponent(finalQuery)}`;
      break;

    case "searx":
      if (sortBy === "date") url = `https://searx.me/?q=${encodeURIComponent(finalQuery)}&sort=date_${sortOrder}`;
      else if (sortBy === "size") url = `https://searx.me/?q=${encodeURIComponent(finalQuery)}&sort=filesize_${sortOrder}`;
      else url = `https://searx.me/?q=${encodeURIComponent(finalQuery)}`;
      break;

    case "filepursuit":
      let fpSort = "datedesc";
      if (sortBy === "date") fpSort = sortOrder === "asc" ? "dateasc" : "datedesc";
      else if (sortBy === "size") fpSort = sortOrder === "asc" ? "sizeasc" : "sizedesc";
      else if (sortBy === "name") fpSort = sortOrder === "asc" ? "nameasc" : "namedesc";
      url = `https://filepursuit.com/pursuit?q=${encodeURIComponent(query)}&type=${resType}&sort=${fpSort}`;
      break;
  }

  window.open(url, "_blank");
});
