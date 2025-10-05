document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = 0;
    renderExpenses();


    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());
        addExpenses(name, amount)
    })


    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function addExpenses(name, amount) {
        if (name !== '' && !isNaN(amount) && amount > 0) {
            expenses.push({ name: name, amount: amount });
            renderExpenses();
        }
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        totalAmount = 0;
        if (expenses.length) {
            expenses.forEach((expense, index) => {
                totalAmount += expense.amount;
                const listItem = document.createElement('li');
                listItem.innerHTML = `<span>${expense.name}</span>`

                // deleting Expenses
                const deleteButton = document.createElement('button');
                deleteButton.className = "deleteBtn";
                deleteButton.textContent = "Delete";

                deleteButton.addEventListener('click', () => {
                    expenses.splice(index, 1);
                    renderExpenses();
                })

                listItem.appendChild(deleteButton);
                expenseList.appendChild(listItem);
            })
        }
        expenseName.value = ""
        expenseAmount.value = ""
        totalAmountDisplay.textContent = `${totalAmount}`
        saveExpenses();
    }

})

