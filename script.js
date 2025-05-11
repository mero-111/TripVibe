const searchInput = document.getElementById("searchInput");
let btn = document.querySelector(".up");
let nothing = document.querySelector(".nothing")

const sheetID = "123ZEXR1zC5FyVvVCXPIt9_YGO46envJYpOUIta2Alhg"; 
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

fetch(url)
  .then(res => res.text())
  .then(data => {
    const json = JSON.parse(data.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const container = document.getElementById("sheetData");

    rows.forEach(row => {
      const title = row.c[0]?.v || "";
      const desc = row.c[1]?.v || "";
      const linkURL = row.c[2]?.v || "";
      const imgURL = row.c[3]?.v || "";
      const country = row.c[4]?.v || "";

      const block = document.createElement("div");
      block.classList.add("content-block");

      block.innerHTML = `
      <div class = "all_content">
        <div class = "content">
          <h3>${title}</h3>
          <span>${country}</span>
          <p>${desc}</p>
          <a href="${linkURL}" target="_blank">Location</a>
        </div>
            <img class = "image" src="${imgURL}" alt="Image" />
      </div>
      `;

      container.appendChild(block);
    });
  });




searchInput.addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const items = document.querySelectorAll("table .all_content");

  items.forEach(function (item) {
    const h3 = item.querySelector("h3");
    const text = h3.textContent.toLowerCase();

    if (text.includes(filter)) {
      item.style.display = "";
      document.querySelector("table").style.display = "block";
      document.querySelector("table").style.display = "none";
      nothing.style.display = "none";
    } else {
      item.style.display = "none";
      document.querySelector("table").style.display = "block";
      document.querySelector(".nothing").style.display = "block";
    }
  });
});


onscroll = function () {
  if (scrollY > 500) {
    btn.style.display = "block"
  }
  else{
    btn.style.display = "none"
  }
}

function up() {
  scroll(0,0)
}

