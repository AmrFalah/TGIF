// initialize statistics object (everything at 0)

var statistics = {
  Democrates: {
    num: 0,
    perOf: 0
  },
  Republicans: {
    num: 0,
    perOf: 0
  },
  Independents: {
    num: 0,
    perOf: 0
  },
  Total: {
    num: 0,
    perOf: 0
  }
};

function populateStatistics(members) {
  for (var i = 0; i < members.length; i++) {
    if (members[i].party == "D") {
      statistics.Democrates.perOf += members[i].votes_with_party_pct;
      statistics.Democrates.num++;
    }
    if (members[i].party == "R") {
      statistics.Republicans.perOf += members[i].votes_with_party_pct;
      statistics.Republicans.num++;
    }
    if (members[i].party == "I") {
      statistics.Independents.perOf += members[i].votes_with_party_pct;
      statistics.Independents.num++;
    }
  }
  for (var key in statistics) {
    if (statistics.hasOwnProperty(key) && statistics[key] != statistics.Total) {
      statistics.Total.num += statistics[key].num;
      statistics.Total.perof += statistics[key].perOf;
    }
  }

  createAtGlanceTable(statistics);
  console.log(statistics);
}

console.log(statistics.Democrates.num);
function createAtGlanceTable(statistics) {
  var table = document.getElementById("Attendence-data");
  var partNumDemRow = document.createElement("tr");
  var partyName = document.createElement("td");
  partyName.innerHTML = "Democrates";
  var partNumDem = document.createElement("td");
  partNumDem.innerHTML = statistics.Democrates.num;
  var partPerOfDem = document.createElement("td");

  if (statistics.Democrates.num == 0) {
    partPerOfDem.innerHTML = 0;
  } else {
    partPerOfDem.innerHTML =
      statistics.Democrates.perOf / statistics.Democrates.num;
  }
  partNumDemRow.append(partyName, partNumDem, partPerOfDem);

  var partNumRepRow = document.createElement("tr");
  var partyName = document.createElement("td");
  partyName.innerHTML = "Republicans";
  var partNumRep = document.createElement("td");
  partNumRep.innerHTML = statistics.Republicans.num;

  var partPerOfRep = document.createElement("td");

  if (statistics.Republicans.num == 0) {
    partPerOfRep.innerHTML = 0;
  } else {
    partPerOfRep.innerHTML =
      statistics.Republicans.perOf / statistics.Republicans.num;
  }
  partNumRepRow.append(partyName, partNumRep, partPerOfRep);

  var partNumIndRow = document.createElement("tr");

  var partyName = document.createElement("td");
  partyName.innerHTML = "Independents";
  var partNumInd = document.createElement("td");
  partNumInd.innerHTML = statistics.Independents.num;

  var partPerOfInd = document.createElement("td");

  if (statistics.Independents.num == 0) {
    partPerOfInd.innerHTML = 0;
  } else {
    partPerOfInd.innerHTML =
      statistics.Independents.perOf / statistics.Independents.num;
  }

  partNumIndRow.append(partyName, partNumInd, partPerOfInd);

  var totalRow = document.createElement("tr");
  var partyName = document.createElement("td");
  partyName.innerHTML = "Total";

  var totalNumRow = document.createElement("td");
  totalNumRow.innerHTML = statistics.Total.num;

  var totalPerOfRow = document.createElement("td");

  totalPerOfRow.innerHTML = statistics.Total.perOf / statistics.Total.num;
  totalRow.append(partyName, totalNumRow, totalPerOfRow);

  table.append(partNumDemRow, partNumRepRow, partNumIndRow, totalRow);
}

function getMost(members) {
  members.sort(function(a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
  });

  var mostArray = [];
  // the last 10%
  for (var k = Math.round(members.length * 0.9); k < members.length; k++) {
    mostArray.push(members[k]);
  }
  for (var k = Math.round(members.length * 0.9); k > 0; k--) {
    if (members[k].missed_votes_pct == members[k - 1].missed_votes_pct) {
      mostArray.push(members[k]);
    }
    break;
  }
  console.log(mostArray);

  createTable(mostArray, "Attendence-min");
}
function getLeast(members) {
  members.sort(function(a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
  });

  var leastArray = [];
  // the last 10%
  for (var k = 0; k < Math.round(members.length * 0.1); k++) {
    leastArray.push(members[k]);
  }
  for (
    var j = members.length * 0.1; //the duplicets
    j < members.length;
    j++
  ) {
    if (members[k].missed_votes_pct == members[k + 1].missed_votes_pct) {
      leastArray.push(members[k]);
    }
    break;
  }
  console.log(leastArray);

  createTable(leastArray, "Attendence-max");
}

function createTable(array, id) {
  let tbody = document.getElementById(id);
  for (var k = 0; k < array.length; k++) {
    rowTab = document.createElement("tr");
    var a = document.createElement("a");

    // Create the text node for anchor element.
    var link = document.createTextNode(
      array[k].first_name +
        "" +
        (array[k].middle_name || " ") +
        array[k].last_name
    );

    // Append the text node to anchor element.
    a.appendChild(link);

    // Set the title.
    a.title =
      array[k].first_name +
      "" +
      (array[k].middle_name || " ") +
      array[k].last_name;

    // Set the href property.
    a.href = array[k].api_uri;

    // Append the anchor element to the body.

    missedVotes = document.createElement("td");
    missedVotes.innerHTML = array[k].missed_votes;

    missedVotesPer = document.createElement("td");
    missedVotesPer.innerHTML = array[k].missed_votes_pct;
    rowTab.append(a, missedVotes, missedVotesPer);
    tbody.append(rowTab);
  }
}

function non() {
  document.getElementById("loader").style.display = "none";
}
