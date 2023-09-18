const progress = document.querySelector(
  ".progress-box .progress .progress-bar"
);
const progressLabelLeft = document.querySelector(
  ".progress-box .progress-bar-details .left"
);
const progressLabelRight = document.querySelector(
  ".progress-box .progress-bar-details .right"
);

let totalCount = 40;
let totalCompletionsYesCount = 0;

function changeWidth() {
  progress.style.width = `${(totalCompletionsYesCount / totalCount) * 100}%`;
  progressLabelLeft.innerHTML = `${Math.floor(
    (totalCompletionsYesCount / totalCount) * 100
  )}% completed`;

  progressLabelRight.innerHTML = `${totalCompletionsYesCount}/${totalCount}`;
}

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
    // Check if Total Completions of both Pathways is "Yes" and Redemption is "No" then Highlight it
    const rowBackgroundColor =
      d["Total Completions of both Pathways"] === "Yes"
        ? "#9CFF2E"
        : d["Redemption Status"] === "No"
        ? "#FF5D5D"
        : "";

    // Check if "Total Completions of both Pathways" is "Yes"
    if (d["Total Completions of both Pathways"] === "Yes") {
      totalCompletionsYesCount++;
    }

    html += `<tr style="background-color: ${rowBackgroundColor};">
                  <th>${i + 1}</th>

                  <td><a href="${
                    d["Google Cloud Skills Boost Profile URL"]
                  }" target="_blank" style="color:black;">${
      d["Student Name"]
    }</a></td>

                  <td>${d["Redemption Status"] === "Yes" ? "✅" : "⚠️"}</td>

                  <td>${
                    d["# of GenAI Game Completed"] === "1" ? "💯" : "❌"
                  }</td>

                  <td>${d["# of Skill Badges Completed"]}</td> 
                        
                  <td>${d["# of Courses Completed"]}</td>
                          
                  <td>${d["Total Completions of both Pathways"]}</td>
                   
    </tr>`;
  });
  console.log("Total Completions of both Pathways:", totalCompletionsYesCount);
  document.getElementById("gccp_body").innerHTML = html;
};

window.addEventListener("load", () => {
  // Call the changeWidth function to update the progress bar width
  changeWidth();
});

updateData("");
const input = document.getElementById("input");
input.addEventListener("input", () => {
  console.log(input.value);
  updateData(input.value);
});
