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
    const input = document.getElementById("searchInput").value;

    // Normalize input: lowercase + remove ALL spaces
    const query = input
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "");

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Stop if empty input OR data not loaded
    if (!query || excelData.length === 0) return;

    const results = excelData.filter(row => {
        if (!row.Firstname || !row.Lastname) return false;

        // Combine firstname + lastname, remove spaces
        const fullName = (
            row.Firstname + row.Lastname
        )
            .toString()
            .toLowerCase()
            .replace(/\s+/g, "");

        // STRICT match
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
