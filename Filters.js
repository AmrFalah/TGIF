function myFunction() {
  var a = document.createElement("a");

  // Create the text node for anchor element.
  var link = document.createTextNode(
    data.results[0].members[i].first_name +
      " " +
      (data.results[0].members[i].middle_name || " ") +
      data.results[0].members[i].last_name
  );

  // Append the text node to anchor element.
  a.appendChild(link);

  // Set the title.
  a.title =
    data.results[0].members[i].first_name +
    " " +
    (data.results[0].members[i].middle_name || " ") +
    data.results[0].members[i].last_name;

  // Set the href property.
  a.href = data.results[0].members[i].api_uri;

  // Append the anchor element to the body.

  var row = document.createElement("tr");
  var namePer = document.createElement("td");
  var partyPer = document.createElement("td");
  var statePer = document.createElement("td");
  var seniorityPer = document.createElement("td");
  var votes_with_party_pctPer = document.createElement("td");

  partyPer.innerHTML = data.results[0].members[i].party;
  statePer.innerHTML = data.results[0].members[i].state;
  seniorityPer.innerHTML = data.results[0].members[i].seniority;
  votes_with_party_pctPer.innerHTML =
    data.results[0].members[i].votes_with_party_pct + "%";

  row.append(a, partyPer, statePer, seniorityPer, votes_with_party_pctPer);
  table.appendChild(row);
}

function filterByParty() {
  if (checks[0].checked) {
    table = document.getElementById("senate-data");
    for (var i = 0; i < data.results[0].members.length; i++) {
      if (data.results[0].members[i].party == "R") {
      }

      if (checks[1].checked) {
        table = document.getElementById("senate-data");
        for (var i = 0; i < data.results[0].members.length; i++) {
          if (data.results[0].members[i].party == "D") {
            var a = document.createElement("a");

            // Create the text node for anchor element.
            var link = document.createTextNode(
              data.results[0].members[i].first_name +
                "" +
                (data.results[0].members[i].middle_name || " ") +
                data.results[0].members[i].last_name
            );

            // Append the text node to anchor element.
            a.appendChild(link);

            // Set the title.
            a.title =
              data.results[0].members[i].first_name +
              " " +
              (data.results[0].members[i].middle_name || " ") +
              data.results[0].members[i].last_name;

            // Set the href property.
            a.href = data.results[0].members[i].api_uri;

            // Append the anchor element to the body.

            var row = document.createElement("tr");
            var namePer = document.createElement("td");
            var partyPer = document.createElement("td");
            var statePer = document.createElement("td");
            var seniorityPer = document.createElement("td");
            var votes_with_party_pctPer = document.createElement("td");

            partyPer.innerHTML = data.results[0].members[i].party;
            statePer.innerHTML = data.results[0].members[i].state;
            seniorityPer.innerHTML = data.results[0].members[i].seniority;
            votes_with_party_pctPer.innerHTML =
              data.results[0].members[i].votes_with_party_pct + "%";

            row.append(
              a,
              partyPer,
              statePer,
              seniorityPer,
              votes_with_party_pctPer
            );
            table.appendChild(row);
          }
        }
      }
      if (checks[2].checked) {
        table = document.getElementById("senate-data");
        for (var i = 0; i < data.results[0].members.length; i++) {
          if (data.results[0].members[i].party == "I") {
            var a = document.createElement("a");

            // Create the text node for anchor element.
            var link = document.createTextNode(
              data.results[0].members[i].first_name +
                " " +
                (data.results[0].members[i].middle_name || " ") +
                data.results[0].members[i].last_name
            );

            // Append the text node to anchor element.
            a.appendChild(link);

            // Set the title.
            a.title =
              data.results[0].members[i].first_name +
              " " +
              (data.results[0].members[i].middle_name || " ") +
              data.results[0].members[i].last_name;

            // Set the href property.
            a.href = data.results[0].members[i].api_uri;

            // Append the anchor element to the body.

            var row = document.createElement("tr");
            var namePer = document.createElement("td");
            var partyPer = document.createElement("td");
            var statePer = document.createElement("td");
            var seniorityPer = document.createElement("td");
            var votes_with_party_pctPer = document.createElement("td");

            partyPer.innerHTML = data.results[0].members[i].party;
            statePer.innerHTML = data.results[0].members[i].state;
            seniorityPer.innerHTML = data.results[0].members[i].seniority;
            votes_with_party_pctPer.innerHTML =
              data.results[0].members[i].votes_with_party_pct + "%";

            row.append(
              a,
              partyPer,
              statePer,
              seniorityPer,
              votes_with_party_pctPer
            );
            table.appendChild(row);
          }
        }
      }
      if (
        (document.getElementById("RepChecked").checked == false &&
          document.getElementById("DemChecked").checked == false &&
          document.getElementById("IndChecked").checked == false) ||
        (document.getElementById("RepChecked").checked == true &&
          document.getElementById("DemChecked").checked == true &&
          document.getElementById("IndChecked").checked == true)
      ) {
        deleteTable();
        myFunction();
      }
    }
  }
}
