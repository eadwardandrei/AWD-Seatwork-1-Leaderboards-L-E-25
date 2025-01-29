const studentNumberInput = document.getElementById('student-number');
const nameInput = document.getElementById('name');
const sectionInput = document.getElementById('section');
const gwaInput = document.getElementById('gwa');
const tableOutput = document.getElementById('transaction-list');
const sortButton = document.getElementById('sort-gwa');

let counter = 0;

let transactionList = [];

let ascending = true;

function AddTransaction() {
    if (!studentNumberInput.value || !nameInput.value || !sectionInput.value || !gwaInput.value) {
        alert("Please fill in all fields!");
        return;
    }

    let newTransaction = {
        id: counter,
        studentNumber: studentNumberInput.value,
        name: nameInput.value,
        section: sectionInput.value,
        gwa: parseFloat(parseFloat(gwaInput.value).toFixed(2))
    };

    transactionList.push(newTransaction);
    localStorage.setItem('transactionList', JSON.stringify(transactionList));
    localStorage.setItem('countert', JSON.stringify(counter));

    counter++;

    RenderTable();

    studentNumberInput.value = '';
    nameInput.value = '';
    sectionInput.value = '';
    gwaInput.value = '';
}

    function RenderTable() {
        tableOutput.innerHTML = "";

        transactionList.forEach((transaction, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${transaction.studentNumber}</td>
            <td>${transaction.name}</td>
            <td>${transaction.section}</td>
            <td>${transaction.gwa}</td>
            <td><button class="delete-btn">Remove</button></td>
        `;

        newRow.querySelector('.delete-btn').addEventListener('click', function() {
            transactionList = transactionList.filter(item => item.id !== transaction.id);
            localStorage.setItem('transactionList', JSON.stringify(transactionList));
            RenderTable();
        });

        tableOutput.appendChild(newRow);
        });
    }

    sortButton.addEventListener('click', function () {
        transactionList.sort((a, b) => ascending ? a.gwa - b.gwa : b.gwa - a.gwa);
        ascending = !ascending;
        RenderTable();
    });

    window.onload = function () {
        const savedTransactions = localStorage.getItem('transactionList');
        if (savedTransactions) {
            transactionList = JSON.parse(savedTransactions).map(transaction => ({
                ...transaction,
                gwa: parseFloat(transaction.gwa)
            }));
            RenderTable();
        }
    };