const studentNumberInput = document.getElementById('student-number');
const nameInput = document.getElementById('name');
const sectionInput = document.getElementById('section');
const gwaInput = document.getElementById('gwa');
const tableOutput = document.getElementById('transaction-list');
const sortGwaButton = document.getElementById('sort-gwa');
const sortStudentNoButton = document.getElementById('sort-student-no');
const sortNameButton = document.getElementById('sort-name');

let counter = 0;

let transactionList = [];

let sortOrder = { gwa: true, studentNumber: true, name: true };

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

    function sortByGwa() {
        transactionList.sort((a, b) => sortOrder.gwa ? a.gwa - b.gwa : b.gwa - a.gwa);
        sortOrder.gwa = !sortOrder.gwa;
        RenderTable();
    }

    function sortByStudentNo() {
        transactionList.sort((a, b) => sortOrder.studentNumber 
            ? a.studentNumber.localeCompare(b.studentNumber, 'en', { numeric: true })
            : b.studentNumber.localeCompare(a.studentNumber, 'en', { numeric: true })
        );
        sortOrder.studentNumber = !sortOrder.studentNumber;
        RenderTable();
    }

    function sortByName() {
        transactionList.sort((a, b) => sortOrder.name
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
        sortOrder.name = !sortOrder.name;
        RenderTable();
    }

    sortGwaButton.addEventListener('click', sortByGwa);
sortStudentNoButton.addEventListener('click', sortByStudentNo);
sortNameButton.addEventListener('click', sortByName);

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
