let excelData = [];

// Load Excel file on page load
fetch("data.xlsx")
    .then(res => res.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        excelData = XLSX.utils.sheet_to_json(sheet);
    });

function search() {
    const query = document.getElementById("searchInput").value
        .toLowerCase()
        .trim();

    const resultDiv = document.getElementById("result");

    // Always clear results
    resultDiv.innerHTML = "";

    // Do nothing until Search button is clicked with input
    if (!query) return;

    // Search ONLY by Firstname (partial or full)
    const results = excelData.filter(row =>
        (row.Firstnamerow.Firstname.toString().toLowerCase().trim()+
        row.Firstname.toString().toLowerCase().trim()).includes(query)
    );

    if (results.length === 0) {
        resultDiv.innerHTML = `<div class="card">No results found</div>`;
        return;
    }

    results.forEach(person => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <strong>${person.Firstname} ${person.Lastname}</strong><br>
            Table Number: ${person["Table Number"]}
        `;
        resultDiv.appendChild(card);
    });
}
