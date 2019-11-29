console.log(data.results[0].members);

var statistics = {
  numDem: 0,
  numRep: 0,
  numInd: 0,
  totalNum: 0,
  perOfD: 0,
  perOfR: 0,
  perOfI: 0,
  avgTot: 0
};

var table = document.getElementById("Attendence-data");

function getTotals() {
  for (var j = 0; j < data.results[0].members.length; j++) {
    if (data.results[0].members[j].party == "D") {
      var totalNumDem = statistics.numDem++;
      statistics.perOfD += data.results[0].members[j].votes_with_party_pct;
    } else if (data.results[0].members[j].party == "R") {
      statistics.numRep++;
      statistics.perOfR += data.results[0].members[j].votes_with_party_pct;
    } else {
      statistics.numInd++;
      statistics.perOfI += data.results[0].members[j].votes_with_party_pct;
    }
  }

  var AvgOfD = statistics.perOfD / statistics.numDem;
  var AvgOfR = statistics.perOfR / statistics.numRep;
  var AvgOfI = statistics.perOfI / statistics.numInd;
  console.log(AvgOfI);

  var rowAtt1 = document.createElement("tr");
  console.log(rowAtt1);

  var row0 = document.createElement("td");
  row0.innerHTML = "Democrates";

  var row1 = document.createElement("td");
  if (statistics.numDem == 0) {
    row1.innerHTML = 0;
  } else {
    row1.innerHTML = AvgOfD;
  }
  console.log(row1);

  var row2 = document.createElement("td");
  row2.innerHTML = statistics.numDem;

  console.log(row2);

  rowAtt1.append(row0, row2, row1);

  var rowAtt2 = document.createElement("tr");
  console.log(rowAtt2);

  var row3 = document.createElement("td");
  row3.innerHTML = "Republicans";

  var row4 = document.createElement("td");
  if (statistics.numRep == 0) {
    row4.innerHTML = 0;
  } else {
    row4.innerHTML = AvgOfR;
  }

  var row5 = document.createElement("td");
  row5.innerHTML = statistics.numRep;

  rowAtt2.append(row3, row5, row4);

  var rowAtt3 = document.createElement("tr");

  var row6 = document.createElement("td");
  row6.innerHTML = "Independents";

  var row8 = document.createElement("td");
  row8.innerHTML = statistics.numInd;

  var row7 = document.createElement("td");
  if (statistics.numInd == 0) {
    row7.innerHTML = 0;
  } else {
    row7.innerHTML = AvgOfI;
  }
  console.log(row8);
  rowAtt3.append(row6, row8, row7);
  table.append(rowAtt1, rowAtt2, rowAtt3);

  var totalrow = document.createElement("tr");
  var Total1 = document.createElement("td");
  Total1.innerHTML = "Total";
  var Total2 = document.createElement("td");
  Total2.innerHTML = statistics.numDem + statistics.numInd + statistics.numRep;
  var Total3 = document.createElement("td");
  if (statistics.numDem == 0) {
    Total3.innerHTML = AvgOfI + AvgOfR / 2;
  } else if (statistics.numRep == 0) {
    Total3.innerHTML = AvgOfI + AvgOfD / 2;
  } else if (statistics.numInd == 0) {
    Total3.innerHTML = AvgOfD + AvgOfR / 2;
  } else {
    Total3.innerHTML = (AvgOfI + AvgOfD + AvgOfR) / 3;
  }

  totalrow.append(Total1, Total2, Total3);
  table.append(totalrow);
}
getTotals();

function getTenPer() {
  data.results[0].members.sort(function(a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
  });

  var table2 = document.getElementById("Attendence-max");

  var rowTab1;
  var valTab;
  var valTab1;
  var valTab2;

  for (var k = 0; k < data.results[0].members.length / 10; k++) {
    rowTab1 = document.createElement("tr");
    var a = document.createElement("a");

    // Create the text node for anchor element.
    var link = document.createTextNode(
      data.results[0].members[k].first_name +
        (data.results[0].members[k].middle_name || " ") +
        data.results[0].members[k].last_name
    );

    // Append the text node to anchor element.
    a.appendChild(link);

    // Set the title.
    a.title =
      data.results[0].members[k].first_name +
      (data.results[0].members[k].middle_name || " ") +
      data.results[0].members[k].last_name;

    // Set the href property.
    a.href = data.results[0].members[k].api_uri;

    valTab1 = document.createElement("td");
    valTab1.innerHTML = data.results[0].members[k].missed_votes;

    valTab2 = document.createElement("td");
    valTab2.innerHTML = data.results[0].members[k].missed_votes_pct;
    rowTab1.append(a, valTab1, valTab2);
    table2.append(rowTab1);
  }
  for (
    var j = data.results[0].members.length * 0.1; //the duplicets
    j < data.results[0].members.length;
    j++
  ) {
    if (
      data.results[0].members[k].missed_votes_pct ==
      data.results[0].members[k + 1].missed_votes_pct
    ) {
      rowTab1 = document.createElement("tr");
      var a = document.createElement("a");

      // Create the text node for anchor element.
      var link = document.createTextNode(
        data.results[0].members[k].first_name +
          (data.results[0].members[k].middle_name || " ") +
          data.results[0].members[k].last_name
      );

      // Append the text node to anchor element.
      a.appendChild(link);

      // Set the title.
      a.title =
        data.results[0].members[k].first_name +
        (data.results[0].members[k].middle_name || " ") +
        data.results[0].members[k].last_name;

      // Set the href property.
      a.href = data.results[0].members[k].api_uri;

      valTab1 = document.createElement("td");
      valTab1.innerHTML = data.results[0].members[k].missed_votes;

      valTab2 = document.createElement("td");
      valTab2.innerHTML = data.results[0].members[k].missed_votes_pct;
      rowTab1.append(a, valTab1, valTab2);
      table2.append(rowTab1);
    }
    break;
  }
}

function getLastTenPer() {
  data.results[0].members.sort(function(a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
  });

  var table2 = document.getElementById("Attendence-min");

  var rowTab1;
  var valTab;
  var valTab1;
  var valTab2;
  for (
    var k = Math.round(data.results[0].members.length * 0.9);
    k < data.results[0].members.length;
    k++
  ) {
    rowTab1 = document.createElement("tr");
    var a = document.createElement("a");

    // Create the text node for anchor element.
    var link = document.createTextNode(
      data.results[0].members[k].first_name +
        (data.results[0].members[k].middle_name || " ") +
        data.results[0].members[k].last_name
    );

    // Append the text node to anchor element.
    a.appendChild(link);

    // Set the title.
    a.title =
      data.results[0].members[k].first_name +
      (data.results[0].members[k].middle_name || " ") +
      data.results[0].members[k].last_name;

    // Set the href property.
    a.href = data.results[0].members[k].api_uri;

    // Append the anchor element to the body.

    valTab1 = document.createElement("td");
    valTab1.innerHTML = data.results[0].members[k].missed_votes;

    valTab2 = document.createElement("td");
    valTab2.innerHTML = data.results[0].members[k].missed_votes_pct;
    rowTab1.append(a, valTab1, valTab2);
    table2.append(rowTab1);
  }
  for (var k = Math.round(data.results[0].members.length * 0.9); k > 0; k--) {
    if (
      data.results[0].members[k].missed_votes_pct ==
      data.results[0].members[k - 1].missed_votes_pct
    ) {
      rowTab1 = document.createElement("tr");
      var a = document.createElement("a");

      // Create the text node for anchor element.
      var link = document.createTextNode(
        data.results[0].members[k].first_name +
          (data.results[0].members[k].middle_name || " ") +
          data.results[0].members[k].last_name
      );

      // Append the text node to anchor element.
      a.appendChild(link);

      // Set the title.
      a.title =
        data.results[0].members[k].first_name +
        (data.results[0].members[k].middle_name || " ") +
        data.results[0].members[k].last_name;

      // Set the href property.
      a.href = data.results[0].members[k].api_uri;

      valTab1 = document.createElement("td");
      valTab1.innerHTML = data.results[0].members[k].missed_votes;

      valTab2 = document.createElement("td");
      valTab2.innerHTML = data.results[0].members[k].missed_votes_pct;
      rowTab1.append(a, valTab1, valTab2);
      table2.append(rowTab1);
    }
    break;
  }
}
getTenPer();

getLastTenPer();
