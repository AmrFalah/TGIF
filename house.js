var members;
var data;
fetch("https://api.propublica.org/congress/v1/115/house/members.json", {
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
    if(document.URL.includes("congress")){
    createTable(members);
    buildDropdown();
    }else if(document.URL.includes("Party") || document.URL.includes("Attendence")){

    getTotals();
    getTenPer();
    getLastTenPer();
  }
  else{

    myFunction1();
  }
  });
