// script.js

// This file handles the logic for the Dashboard page.
// We use a simple check so it doesn't cause errors on the index page.

document.addEventListener("DOMContentLoaded", function () {
    
    // Check if we are on the dashboard by looking for the table body
    const tableBody = document.getElementById("tableBody");
    
    if (tableBody) {
        // Elements
        const refreshBtn = document.getElementById("refreshBtn");
        const csvBtn = document.getElementById("csvBtn");
        
        // 1. Initialize data when page loads
        updateDashboard();

        // 2. Set up button clicks
        refreshBtn.addEventListener("click", updateDashboard);
        csvBtn.addEventListener("click", downloadCSV);
    }

});

// --- Main Function to Update Everything ---
function updateDashboard() {
    updateScores();
    
    const sampleData = generateSampleData();
    fillTable(sampleData);
    drawSimpleChart(sampleData);
}

// --- 1. Generate Random Scores for Left Panel ---
function updateScores() {
    // Generate random numbers between 60 and 99
    const impact = Math.floor(Math.random() * 40) + 60;
    const reputation = Math.floor(Math.random() * 40) + 60;
    const alignment = Math.floor(Math.random() * 40) + 60;

    document.getElementById("impactScore").innerText = impact;
    document.getElementById("reputationScore").innerText = reputation;
    document.getElementById("alignmentScore").innerText = alignment;
}

// --- 2. Generate Sample Data for Table & Chart ---
function generateSampleData() {
    const platforms = ["LinkedIn", "Twitter", "GitHub", "Blog"];
    const sentiments = ["Positive", "Neutral", "Positive", "Negative"];
    const topics = ["Project Launch", "Code Rant", "Open Source PR", "Tech Review"];
    
    let data = [];
    
    for (let i = 0; i < 4; i++) {
        data.push({
            title: topics[i],
            platform: platforms[i],
            sentiment: sentiments[Math.floor(Math.random() * sentiments.length)], // Random sentiment
            score: Math.floor(Math.random() * 50) + 50 // Score from 50 to 99
        });
    }
    
    return data;
}

// --- 3. Fill Table with Data ---
function fillTable(dataArray) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = ""; // Clear old rows

    for (let i = 0; i < dataArray.length; i++) {
        let row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${dataArray[i].title}</td>
            <td>${dataArray[i].platform}</td>
            <td>${dataArray[i].sentiment}</td>
            <td>${dataArray[i].score}</td>
        `;
        
        tbody.appendChild(row);
    }
}

// --- 4. Draw Simple HTML/CSS Bar Chart ---
function drawSimpleChart(dataArray) {
    const chartContainer = document.getElementById("barChart");
    chartContainer.innerHTML = ""; // Clear old chart

    for (let i = 0; i < dataArray.length; i++) {
        let chartRow = document.createElement("div");
        chartRow.className = "chart-row";
        
        chartRow.innerHTML = `
            <div class="chart-label">${dataArray[i].platform}</div>
            <div class="chart-bar-bg">
                <div class="chart-bar-fill" style="width: ${dataArray[i].score}%"></div>
            </div>
            <div>${dataArray[i].score}%</div>
        `;
        
        chartContainer.appendChild(chartRow);
    }
}

// --- 5. Export Table Data to CSV ---
function downloadCSV() {
    const table = document.getElementById("dataTable");
    let rows = table.querySelectorAll("tr");
    let csvContent = "";

    // Loop through all rows (including headers)
    for (let i = 0; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll("td, th");
        let rowData = [];
        
        for (let j = 0; j < cols.length; j++) {
            rowData.push(cols[j].innerText);
        }
        
        csvContent += rowData.join(",") + "\n"; // Add line break after each row
    }

    // Create a hidden link to trigger the download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "IdentityMatrix_Data.csv");
    a.click(); // Automatically click it to download
}