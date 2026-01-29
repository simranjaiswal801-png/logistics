// Dummy data
const shipments = [
    { id: 'S001', route: 'Delhi-Mumbai', vehicle: 'MH12', amount: '₹50,000', status: 'Completed' },
    { id: 'S002', route: 'Mumbai-Pune', vehicle: 'MH13', amount: '₹30,000', status: 'Pending' },
    { id: 'S003', route: 'Delhi-Chennai', vehicle: 'MH14', amount: '₹70,000', status: 'In Transit' }
];

const expenses = [
    { date: '2023-10-01', vehicle: 'MH12', type: 'Fuel', amount: '₹3000' },
    { date: '2023-10-02', vehicle: 'MH13', type: 'Toll', amount: '₹500' }
];

const vehicles = [
    { number: 'MH12', driver: 'Rajesh Kumar', trips: 25, expense: '₹50,000', profit: '₹1,00,000' },
    { number: 'MH13', driver: 'Amit Singh', trips: 20, expense: '₹40,000', profit: '₹80,000' },
    { number: 'MH14', driver: 'Vikram Rao', trips: 30, expense: '₹60,000', profit: '₹1,20,000' }
];

// Login form handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }

    // Render shipments table
    const shipmentsTable = document.getElementById('shipments-table');
    if (shipmentsTable) {
        const tbody = shipmentsTable.querySelector('tbody');
        shipments.forEach(shipment => {
            const row = `<tr>
                <td>${shipment.id}</td>
                <td>${shipment.route}</td>
                <td>${shipment.vehicle}</td>
                <td>${shipment.amount}</td>
                <td>${shipment.status}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }

    // Invoice calculation
    const invoiceForm = document.getElementById('invoice-form');
    if (invoiceForm) {
        const distance = document.getElementById('distance');
        const costPerKm = document.getElementById('cost-per-km');
        const gst = document.getElementById('gst');
        const totalAmount = document.getElementById('total-amount');

        const calculateTotal = () => {
            const dist = parseFloat(distance.value) || 0;
            const cost = parseFloat(costPerKm.value) || 0;
            const gstPercent = parseFloat(gst.value) || 0;
            const subtotal = dist * cost;
            const total = subtotal + (subtotal * gstPercent / 100);
            totalAmount.value = total.toFixed(2);
        };

        [distance, costPerKm, gst].forEach(input => input.addEventListener('input', calculateTotal));

        invoiceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Invoice generated successfully!');
        });
    }

    // Expense form handler
    const expenseForm = document.getElementById('expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newExpense = {
                date: document.getElementById('date').value,
                vehicle: document.getElementById('vehicle-number-exp').value,
                type: document.getElementById('expense-type').value,
                amount: document.getElementById('amount').value
            };
            expenses.push(newExpense);
            renderExpensesTable();
            expenseForm.reset();
        });
    }

    // Render expenses table
    const renderExpensesTable = () => {
        const expensesTable = document.getElementById('expenses-table');
        if (expensesTable) {
            const tbody = expensesTable.querySelector('tbody');
            tbody.innerHTML = '';
            expenses.forEach(expense => {
                const row = `<tr>
                    <td>${expense.date}</td>
                    <td>${expense.vehicle}</td>
                    <td>${expense.type}</td>
                    <td>₹${expense.amount}</td>
                </tr>`;
                tbody.innerHTML += row;
            });
        }
    };
    renderExpensesTable();

    // Render vehicles cards
    const vehiclesContainer = document.getElementById('vehicles-container');
    if (vehiclesContainer) {
        vehicles.forEach(vehicle => {
            const card = `<div class="card">
                <h3>${vehicle.number}</h3>
                <p>Driver: ${vehicle.driver}</p>
                <p>Total Trips: ${vehicle.trips}</p>
                <p>Total Expense: ${vehicle.expense}</p>
                <p>Total Profit: ${vehicle.profit}</p>
            </div>`;
            vehiclesContainer.innerHTML += card;
        });
    }

    // AI Assistant chat
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    if (chatInput && sendBtn && chatWindow) {
        sendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                const userMessage = `<div class="message user">${message}</div>`;
                chatWindow.innerHTML += userMessage;
                chatInput.value = '';
                // Dummy AI response
                setTimeout(() => {
                    const aiResponse = `<div class="message ai">AI: Processed your request for "${message}". Expense added or report generated!</div>`;
                    chatWindow.innerHTML += aiResponse;
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                }, 1000);
            }
        });
    }
});