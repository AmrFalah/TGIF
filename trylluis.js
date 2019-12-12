let chamber;
​
if (document.URL.includes("senate")) {
  chamber = "senate";
} else {
  chamber = "house";
}
​
fetch(`https://api.propublica.org/congress/v1/113/${chamber}/members.json`, {
  method: "GET",
  headers: {
    "X-API-KEY": "aklwowxCPxdIhQtbYKU9CtttKlvUrWgbERU6Gbdd"
  }
})
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(function(json) {
    const members = json.results[0].members;
    populateSelect(members);
    eventListeners(members);
    createTable(members);
  })
  .catch(function(error) {});
​





















function createTable(members) {
  let tbody = document.getElementById("senate-body");
  tbody.innerHTML = "";
​
  for (let i = 0; i < members.length; i++) {
    let row = document.createElement("tr");
    let name = document.createElement("td");
    let party = document.createElement("td");
    let state = document.createElement("td");
    let seniority = document.createElement("td");
    let percentage = document.createElement("td");
​
    name.innerHTML = members[i].last_name + ", " + members[i].first_name;
    party.innerHTML = members[i].party;
    state.innerHTML = members[i].state;
    seniority.innerHTML = members[i].seniority;
    percentage.innerHTML = members[i].votes_with_party_pct;
​
    row.append(name, party, state, seniority, percentage);
    tbody.append(row);
  }
}
​
function filterByParty(members) {
  //   let filteredArray = [];
  //node list of checked check boxes 
  let checked = document.querySelectorAll(
    "input[name='partyCheckbox']:checked"
  );

  //new array with the checked values 
  let checkedValues = Array.from(checked).map(cb =>  cb.value
  );
​
  if (checkedValues.length == 0) {
    createTable(members);
    return;
  }
​
    // get all the parties from members with the same cheched value
  let filteredArray = members.filter(member => checkedValues.includes(member.party)
  );
​
  //   for (let k = 0; k < members.length; k++) {
  //     for (let l = 0; l < checkedValues.length; l++) {
  //       if (members[k].party == checkedValues[l]) {
  //         filteredArray.push(members[k]);
  //       }
  //     }
  //   }
​
  filterByState(filteredArray);
}
​
function filterByState(members) {
    //get the value of check boxes 
  let dropdownValue = document.getElementById("states").value;
​
  if (dropdownValue == "all") {
    createTable(members);
    return;
  }
​
// filter the member list by state with the chosen state of dropdown
  let filteredArray = members.filter(member => member.state == dropdownValue
  );
​
  createTable(filteredArray);
}
​
function eventListeners(members) {
    //get all the checked list 
  let checkboxes = document.querySelectorAll("input[name='partyCheckbox']");
​
  for (let j = 0; j < checkboxes.length; j++) {
    checkboxes[j].addEventListener("click", function() {
      filterByParty(members);
    });
  }
​
  let select = document.getElementById("states");
  select.addEventListener("change", function() {
    filterByParty(members);
  });
}
​
function populateSelect(members) {
    //but all the states in an array and sort it also don't repeat 
  let uniqueStates = [...new Set(members.map(member => member.state))].sort(); 
​
  let select = document.getElementById("states");
  uniqueStates.forEach(state => {
    let option = document.createElement("option");
    option.innerHTML = state;
    option.value = state;
    select.append(option);
  });
}
Collapse


