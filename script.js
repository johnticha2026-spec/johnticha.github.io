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
    // Remove ALL spaces from input
    const query = document.getElementById("searchInput").value
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "");

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (!query) return;

    const results = excelData.filter(row => {
        if (!row.Firstname || !row.Lastname) return false;

        // Combine firstname + lastname with NO spaces
        const fullName = (
            row.Firstname.toString().toLowerCase().trim() +
            row.Lastname.toString().toLowerCase().trim()
        ).replace(/\s+/g, "");

        return fullName.includes(query);
    });

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
