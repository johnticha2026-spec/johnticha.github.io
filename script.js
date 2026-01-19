function search() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultDiv = document.getElementById("result");

    // Always clear results first
    resultDiv.innerHTML = "";

    // Do nothing if search button is clicked with empty input
    if (!query) return;

    // Search ONLY by Firstname (full or partial match)
    const results = excelData.filter(row =>
        row.Lastname.toLowerCase().includes(query) 
        //|| row.Firstname.toLowerCase().includes(query)
    );

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
