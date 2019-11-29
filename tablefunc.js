var table = document.getElementById("senate-data");
var checks = document.querySelectorAll("input[type=checkbox]");
var dropValue = document.querySelector("select");

function myFunction1() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

// beginning:
// function that gets all unique states and create a dropdown
// addEventListeners to checkboxes and dropdown
// function that build table
// call create table with full members

// when checkbox click, filter and call createTable
// when dropdown change, filter and call createTable

function init() {
  document.querySelector("select").addEventListener("change", function() {
    filterByParty();
  });

  for (var i = 0; i < checks.length; i++) {
    checks[i].addEventListener("click", function() {
      filterByParty();
    });
  }

  createTable(data.results[0].members);

  buildDropdown();
}
init();
function createTable(arrayOfMembers) {
  table.innerHTML = "";
  if (arrayOfMembers.length == 0) {
    var x = document.createElement("p");
    x.innerHTML = "There is nobody with those filters";
    table.append(x);
  } else {
    for (var i = 0; i < arrayOfMembers.length; i++) {
      var a = document.createElement("a");

      // Create the text node for anchor element.
      var link = document.createTextNode(
        arrayOfMembers[i].first_name +
          " " +
          (arrayOfMembers[i].middle_name || " ") +
          arrayOfMembers[i].last_name
      );

      // Append the text node to anchor element.
      a.appendChild(link);

      // Set the title.
      a.title =
        arrayOfMembers[i].first_name +
        " " +
        (arrayOfMembers[i].middle_name || " ") +
        arrayOfMembers[i].last_name;

      // Set the href property.
      a.href = arrayOfMembers[i].api_uri;

      // Append the anchor element to the body.

      var row = document.createElement("tr");
      var namePer = document.createElement("td");
      var partyPer = document.createElement("td");
      var statePer = document.createElement("td");
      var seniorityPer = document.createElement("td");
      var votes_with_party_pctPer = document.createElement("td");

      partyPer.innerHTML = arrayOfMembers[i].party;
      statePer.innerHTML = arrayOfMembers[i].state;
      seniorityPer.innerHTML = arrayOfMembers[i].seniority;
      votes_with_party_pctPer.innerHTML =
        arrayOfMembers[i].votes_with_party_pct + "%";

      row.append(a, partyPer, statePer, seniorityPer, votes_with_party_pctPer);
      table.appendChild(row);
    }
  }
}
function buildDropdown() {
  var dropList = document.getElementById("dropState");
  var dropArray = [];

  var orderedByParty = Array.from(
    data.results[0].members.sort(function(a, b) {
      if (a.state < b.state) {
        return -1;
      } else if (a.state > b.state) {
        return 1;
      } else 0;
    })
  );
  console.log(orderedByParty);
  // appender  (dropList)
  //empty (dropArray)
  // sorted (orderedByParty)
  // put

  for (var i = 0; i < orderedByParty.length; i++) {
    if (!dropArray.includes(orderedByParty[i].state)) {
      dropArray.push(orderedByParty[i].state);
    }
  }
  console.log(dropArray.length);
  console.log(dropArray);
  for (var j = 0; j < dropArray.length; j++) {
    var stateDrop = document.createElement("option");
    stateDrop.innerHTML = dropArray[j];

    dropList.appendChild(stateDrop);
  }
}

function filterByParty() {
  var filteredMembers = [];
  if (!checks[0].checked && !checks[1].checked && !checks[2].checked) {
    console.log("in if");

    filterByState(data.results[0].members);
  } else {
    for (var i = 0; i < data.results[0].members.length; i++) {
      if (checks[0].checked && data.results[0].members[i].party == "R") {
        filteredMembers.push(data.results[0].members[i]);
      }
      if (checks[1].checked && data.results[0].members[i].party == "D") {
        filteredMembers.push(data.results[0].members[i]);
      }

      if (checks[2].checked && data.results[0].members[i].party == "I") {
        filteredMembers.push(data.results[0].members[i]);
      }
    }

    console.log(filteredMembers);
    filterByState(filteredMembers);
  }
}

function filterByState(filteredMembers) {
  console.log(filteredMembers);

  let filteredByState = [];

  if (dropValue.value == "all") {
    createTable(filteredMembers);
  } else {
    for (var i = 0; i < filteredMembers.length; i++) {
      if (dropValue.value == filteredMembers[i].state) {
        filteredByState.push(filteredMembers[i]);
      }
    }
    createTable(filteredByState);
  }
}
