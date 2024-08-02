const table = document.querySelector(".bottom-left table").lastElementChild;

document.querySelector("#action").addEventListener("change", selectFunction)

function updateStates() {
    const crosses = Array.from(document.querySelectorAll(".bottom-left table tr td:last-child"));

    crosses.forEach(cross => {
        cross.addEventListener("click", removeRow)
    })

    const numberBox = document.querySelectorAll(".top-container")[0].getElementsByTagName("span")[0],
        firstBox = document.querySelectorAll(".top-container")[1].getElementsByTagName("span")[0],
        secondBox = document.querySelectorAll(".top-container")[2].getElementsByTagName("span")[0],
        totalBox = document.querySelectorAll(".top-container")[3].getElementsByTagName("span")[0];

    let totalFirst = 0;
    let totalSecond = 0;

    for (i = 1; i < table.children.length; i++) {
        totalFirst += Number.parseInt(table.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerText)
    }

    for (i = 1; i < table.children.length; i++) {
        totalSecond += Number.parseInt(table.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerText)
    }

    numberBox.innerText = table.children.length - 1;
    firstBox.innerText = totalFirst;
    secondBox.innerText = totalSecond;
    totalBox.innerText = Number.parseInt(firstBox.innerText) + Number.parseInt(secondBox.innerText);

    crosses.forEach(cross => {
        cross.addEventListener("click", removeRow)
    })
}

function addBundle(event) {
    let actionValue = document.querySelector("#action").value;

    event.preventDefault();

    if (actionValue == "None") {
        addSingleBundle();
    } else if (actionValue == "2 no scissor") {
        addNumberBundles(2);
    } else if (actionValue == "3 no scissor") {
        addNumberBundles(3);
    } else if (actionValue == "4 no scissor") {
        addNumberBundles(4);
    } else if (actionValue == "Clause") {
        addClauseBundles();
    }

}

function addSingleBundle() {

    const bundleInput = document.querySelector("footer input:nth-child(1)");
    const firstInput = document.querySelector("footer input:nth-child(2)");
    const secondInput = document.querySelector("footer input:nth-child(3)");

    let lastNumber = Number.parseInt(table.lastElementChild.firstElementChild.innerHTML);

    if (table.lastElementChild.firstElementChild.innerHTML == "#") {
        lastNumber = 0;
    }

    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    td.innerHTML = lastNumber + 1;
    td1.innerHTML = bundleInput.value;
    td2.innerHTML = firstInput.value;
    td3.innerHTML = secondInput.value;
    td4.innerHTML = "x";

    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    table.appendChild(tr);

    bundleInput.value = "";
    firstInput.value = "";
    secondInput.value = "";

    updateStates();
}

function addNumberBundles(maxLength) {

    const bundleInput = document.querySelector("footer input:nth-child(1)");
    const firstInput = document.querySelector("footer input:nth-child(2)");
    const secondInput = document.querySelector("footer input:nth-child(3)");

    let numberString = filterSameNumbers(bundleInput.value);

    if (maxLength === 4) {
        if (numberString.length === 3 || numberString.length === 2 || numberString.length === 1) {
            alert("Atleast 4 distinct numbers required");
        }
    }

    function permute(currentPerm, remainingDigits, combinations) {

        if (currentPerm.length === maxLength) {
            combinations.push({ id: combinations.length + 1, permutation: currentPerm, first: firstInput.value, second: secondInput.value });
            return;
        }

        for (let i = 0; i < remainingDigits.length; i++) {
            let newPerm = currentPerm + remainingDigits[i];
            let remaining = remainingDigits.slice(0, i) + remainingDigits.slice(i + 1);
            permute(newPerm, remaining, combinations);
        }
    }

    let combinations = [];

    permute('', numberString, combinations);

    combinations.forEach(combination => {

        let lastNumber = Number.parseInt(table.lastElementChild.firstElementChild.innerHTML);

        if (table.lastElementChild.firstElementChild.innerHTML == "#") {
            lastNumber = 0;
        }

        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");

        td.innerHTML = lastNumber + 1;
        td1.innerHTML = combination.permutation;
        td2.innerHTML = combination.first;
        td3.innerHTML = combination.second;
        td4.innerHTML = "x";

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        table.appendChild(tr);

        bundleInput.value = "";
        firstInput.value = "";
        secondInput.value = "";
    })

    updateStates();
}

function addClauseBundles() {
    const bundleInput = document.querySelector("footer input:nth-child(1)");
    const firstInput = document.querySelector("footer input:nth-child(2)");
    const secondInput = document.querySelector("footer input:nth-child(3)");

    let allPossibleNumbers = [];

    for (let i = 0; i < 10; i++) {
        allPossibleNumbers.push(`${i}${bundleInput.value}`);
    }

    allPossibleNumbers.forEach(number => {
        let lastNumber = Number.parseInt(table.lastElementChild.firstElementChild.innerHTML);

        if (table.lastElementChild.firstElementChild.innerHTML == "#") {
            lastNumber = 0;
        }

        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");

        td.innerHTML = lastNumber + 1;
        td1.innerHTML = number;
        td2.innerHTML = firstInput.value;
        td3.innerHTML = secondInput.value;
        td4.innerHTML = "x";

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        table.appendChild(tr);
    })

    bundleInput.value = "";
    firstInput.value = "";
    secondInput.value = "";

    updateStates();
}

async function printSheet() {

    const customer_name = document.getElementById("customer_name").value;

    if(!customer_name){
        return alert("Please Fill Customer Name");
    };

    const draw_name = document.getElementById("select-draw").value;

    if(draw_name === "None"){
        return alert("Please select draw first!");
    };

    const draw_end_date = document.getElementById("dateContainer").innerText;

    if(!draw_end_date){
        return alert("Again select draw and then try again");
    };

    const data = [];

    const trs = Array.from(document.querySelectorAll("table tr"));

    if(trs.length === 1){
        return alert("You don't have data to Print.")
    }

    for (let i = 1; i < trs.length; i++) {

        const number = Number.parseInt(trs[i].querySelectorAll("td")[1].innerHTML);
        const first = Number.parseInt(trs[i].querySelectorAll("td")[2].innerHTML);
        const second = Number.parseInt(trs[i].querySelectorAll("td")[3].innerHTML);

        const obj = {
            sNo: i,
            number: number,
            first: first,
            second: second
        };

        data.push(obj);
    }

    let response = await fetch("/setting/print-home-data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: data, draw_name: draw_name, draw_date: draw_end_date, customer_name: customer_name })
    })

}

function removeRow(event) {
    event.target.parentElement.remove();

    const tds = Array.from(document.querySelectorAll(".bottom-left table tr td:first-child"));

    tds.forEach((td, idx) => {
        td.innerHTML = idx + 1;
    })

    updateStates();
}

function clearAllRows() {

    const trs = Array.from(document.querySelectorAll("table tr"));

    for (let i = 1; i < trs.length; i++) {
        trs[i].remove();
    }

    updateStates();
}

function filterSameNumbers(str) {
    let seen = {};
    let result = '';

    for (let char of str) {
        if (!seen[char]) {
            seen[char] = true;
            result += char;
        }
    }

    return result;
}

function selectFunction(event) {
    let input = document.querySelector("footer input:nth-child(1)")

    if (event.target.value == "Clause") {
        input.value = "";
        input.maxLength = 1;
    } else {
        input.maxLength = 6;
    }
}

function getBillData() {
    const draw_name = document.getElementById("select-draw").value;

    if(draw_name === "None"){
        return alert("Please select draw first!");
    };

    const draw_end_date = document.getElementById("dateContainer").innerText;

    if(!draw_end_date){
        return alert("Again select draw and then try again");
    };

    const bill_creation_date = new Date().toISOString().split("T")[0];

    const customer_name = document.getElementById("customer_name").value;

    if(!customer_name){
        return alert("Please Fill Customer Name");
    };

    const data = [];

    const tableMain = document.querySelector(".bottom-left table").lastElementChild;

    for (let i = 1; i < tableMain.rows.length; i++) {
        const row = tableMain.rows[i];

        const rowData = {
            sNo: parseInt(row.cells[0].innerText),
            number: parseInt(row.cells[1].innerText),
            first: parseFloat(row.cells[2].innerText),
            second: parseFloat(row.cells[3].innerText)
        };
        data.push(rowData);
    }

    if(data.length == 0 || data.length < 1){
        return alert("You don't have data to save");
    }

    postBillData(customer_name, draw_name, draw_end_date, bill_creation_date, data);
}

async function postBillData(customer_name, draw_name, draw_end_date, bill_creation_date, data){
    const response = await fetch("/draw/save", {
        method: "POST",
        headers: {
            'Content-Type': 'application/Json'
        },
        body: JSON.stringify({ customer_name, draw_name, draw_end_date, bill_creation_date, data })
    })

    if(!response.ok){
        alert("Something goes wrong Please try again");
    }else{
        alert("Data saved successfully");
    }
}

document.querySelectorAll(".bottom-buttons button")[0].addEventListener("click", getBillData)