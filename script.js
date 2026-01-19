function search() {
    const query = document.getElementById("searchInput").value
        .toString()
        .toLowerCase()
        .trim();

    const resultDiv = document.getElementById("result");

    // Clear previous results
    resultDiv.innerHTML = "";

    // Show nothing until Search is clicked with text
    if (!query) return;

    const results = excelData.filter(row => {
        if (!row.Firstname) return false;

        return row.Firstname
            .toString()
            .toLowerCase()
            .includes(query);
    });

    if (results.length === 0) {
        resultDiv.innerHTML = `<div class="card">No results found</div>`;
        return;
    }

    results.forEach(person => {
        const item = document.createElement("div");
        item.className = "card";
        item.innerHTML = `
            <strong>${person.Firstname} ${person.Lastname}</strong><br>
            Table Number: ${person["Table Number"]}
        `;
        resultDiv.appendChild(item);
    });
}
