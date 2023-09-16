function compare(a, b) {
  if (a["# of Courses Completed"] > b["# of Courses Completed"]) {
    return -1;
  }
  if (a["# of Courses Completed"] < b["# of Courses Completed"]) {
    return 1;
  }
  return 0;
}

const updateData = async (filter) => {
  let data = await (await fetch("./data.json")).json();
  if (filter !== "") {
    data = data.filter((el) => {
      return el["Student Name"].toLowerCase().includes(filter.toLowerCase());
    });
  }

  data.sort(compare);

  let html = "";
  data.forEach((d, i) => {
    // Check if Total Completions of both Pathways is "Yes"
    const rowBackgroundColor =
      d["Total Completions of both Pathways"] === "Yes" ? "#9CFF2E" : "";

    // Check if Redemption Status is "No"
    const redemptionStatusBackgroundColor =
      d["Redemption Status"] === "No" ? "#FF5D5D" : "";

    html += `<tr style="background-color: ${rowBackgroundColor};">
                  <th style="background-color: ${redemptionStatusBackgroundColor};">${
      i + 1
    }</th>

                  <td style="background-color: ${redemptionStatusBackgroundColor};"><a href="${
      d["Google Cloud Skills Boost Profile URL"]
    }" target="_blank" style="color:black;">${d["Student Name"]}</a></td>

                  <td style="background-color: ${redemptionStatusBackgroundColor};">${
      d["Redemption Status"] === "Yes" ? "✅" : "⚠️"
    }</td>

                  <td style="background-color: ${redemptionStatusBackgroundColor};">${
      d["# of GenAI Game Completed"] === "1" ? "💯" : "❌"
    }</td>

                  <td style="background-color: ${redemptionStatusBackgroundColor};">${
      d["# of Skill Badges Completed"]
    }</td> 
                        
                  <td style="background-color: ${redemptionStatusBackgroundColor};">${
      d["# of Courses Completed"]
    }</td>
                          
                  <td style="background-color: ${redemptionStatusBackgroundColor};">${
      d["Total Completions of both Pathways"]
    }</td>
                   
    </tr>`;
  });
  document.getElementById("gccp_body").innerHTML = html;
};

updateData("");
const input = document.getElementById("input");
input.addEventListener("input", () => {
  console.log(input.value);
  updateData(input.value);
});
