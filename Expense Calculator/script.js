let expenses = [];

function addExpense() {
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (category && !isNaN(amount) && amount > 0) {
        expenses.push({ category, amount });
        updateExpensesTable();
        clearInputs();
    } else {
        alert("Please enter a valid category and amount.");
    }
}

function updateExpensesTable() {
    const tableBody = document.getElementById("expensesTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";

    expenses.forEach(expense => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerText = expense.category;
        cell2.innerText = expense.amount;
    });
}

function clearInputs() {
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
}

function calculate() {
    if (expenses.length === 0) {
        alert("Please add expenses first.");
        return;
    }

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const avgDailyExpense = totalAmount / 30;

    const topExpenses = expenses.sort((a, b) => b.amount - a.amount).slice(0, 3);

    document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);
    document.getElementById("avgDailyExpense").innerText = avgDailyExpense.toFixed(2);

    const topExpensesList = document.getElementById("topExpenses");
    topExpensesList.innerHTML = "";
    topExpenses.forEach(expense => {
        const listItem = document.createElement("li");
        listItem.innerText = `${expense.category} ($${expense.amount})`;
        topExpensesList.appendChild(listItem);
    });
}
