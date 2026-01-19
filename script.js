function search() {
    const query = document.getElementById("searchInput").value
        .toString()
        .toLowerCase()
        .trim();

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (query === "") return;

    const results = excelData.filter(row => {
        if (!row.Firstname) return false;

        const firstName = row.Firstname
            .toString()
            .toLowerCase()
            .trim();

        return firstName.includes(query);
    });

    if (results.length === 0) {
        resultDiv.innerHTML = "<p>No results found</p>";
        return;
    }

    results.forEach(person => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <strong>${person.Firstname} ${person.Lastname}</strong><br>
            Table Number: ${person["Table"]}
        `;
        resultDiv.appendChild(div);
    });
}
