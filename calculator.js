let results = []; // store only valid numbers
let rows = [];    // store all computation rows

const form = document.getElementById("calcForm");
const tablesDiv = document.getElementById("tables");
const finishBtn = document.getElementById("finishBtn");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let x = document.getElementById("x").value;
    let y = document.getElementById("y").value;
    let op = document.getElementById("op").value;

    let result;

    if (isNaN(x) || isNaN(y) || x === "" || y === "") {
        result = "wrong input number";
    } else {
        x = Number(x);
        y = Number(y);
        switch (op) {
            case "+": result = x + y; results.push(result); break;
            case "-": result = x - y; results.push(result); break;
            case "*": result = x * y; results.push(result); break;
            case "/":
                if (y === 0) {
                    result = "computation error";
                } else {
                    result = x / y;
                    results.push(result);
                }
                break;
            case "%": result = x % y; results.push(result); break;
            default: result = "computation error";
        }
    }

    rows.push({ x, op, y, result });
    renderTable();
});

finishBtn.addEventListener("click", function () {
    renderSummary();
});

function renderTable() {
    let html = "<table>";
    html += "<tr><th>x</th><th>op</th><th>y</th><th>result</th></tr>";
    rows.forEach(r => {
        html += `<tr><td>${r.x}</td><td>${r.op}</td><td>${r.y}</td><td>${r.result}</td></tr>`;
    });
    html += "</table>";
    tablesDiv.innerHTML = html;
}

function renderSummary() {
    if (results.length === 0) return;

    let min = Math.min(...results);
    let max = Math.max(...results);
    let total = results.reduce((a, b) => a + b, 0);
    let avg = total / results.length;

    let html = tablesDiv.innerHTML;
    html += "<table>";
    html += "<tr><th>Min</th><th>Max</th><th>Average</th><th>Total</th></tr>";
    html += `<tr><td>${min}</td><td>${max}</td><td>${avg}</td><td>${total}</td></tr>`;
    html += "</table>";
    tablesDiv.innerHTML = html;
}
