let excelData = [];

// Load Excel file on page load
fetch("data.xlsx")
    .then(res => res.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        excelData = XLSX.utils.sheet_to_json(sheet);
    });

// Trigger search on typing
document.getElementById("searchInput").addEventListener("keyup", search);

function search() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "";

    if (!query) return;

    const results = excelData.filter(row =>
        row.Firstname.toLowerCase().includes(query) ||
        row.Lastname.toLowerCase().includes(query)
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
        Table Number: ${person.Table}
    `;
    resultDiv.appendChild(div);
});

}
