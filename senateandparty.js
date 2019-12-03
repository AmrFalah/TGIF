var members;
var data;
var url = "";
if (document.URL.includes("Senate")) {
  url = "senate";
} else {
  url = "house";
}

//fetch("https://api.propublica.org/congress/v1/115/" + url+"/members.json", {
fetch(`https://api.propublica.org/congress/v1/113/${url}/members.json`, {
  method: "GET",
  headers: {
    "X-API-Key": "HnwZgB8CUcvgG7rRMhHhGdVuFcJvcBq9vcgXweUb"
  }
})
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }

    throw new Error(response.statusText);
  })
  .then(function(json) {
    data = json;
    members = json.results[0].members;
    var loader = document.getElementById("loader");

    if (document.URL.includes("congress")) {
      non();
      createTable(members);
      buildDropdown();
    } else if (
      document.URL.includes("Attendence") ||
      document.URL.includes("Party")
    ) {
      non();
      getTotals(members);
      getTenPer(members);
      getLastTenPer(members);
    } else if (document.URL.includes("Index")) {
      non();
      myFunction1();
    }
  });
