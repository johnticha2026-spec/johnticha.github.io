function search() {
    const query = document.getElementById("searchInput").value
        .toString()
        .toLowerCase()
        .replace(/\s+/g, ""); // remove ALL spaces

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (!query) return;

    const results = excelData.filter(row => {
        if (!row.Firstname || !row.Lastname) return false;

        const fullName = (
            row.Firstname.toString().trim() +
            row.Lastname.toString().trim()
        )
            .toLowerCase()
            .replace(/\s+/g, ""); // safety: no spaces

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
