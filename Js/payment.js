// get data from localstorage by id
const cartItems = JSON.parse(localStorage.getItem('cartItems'));

if (cartItems && cartItems.length > 0) {
    const cartContents = document.getElementById('cartContents');
    cartItems.forEach((item) => {
        const listItem = document.createElement('li');
        // showing item products
        listItem.textContent = `${item.name} - Rp ${item.price} x ${item.quantity}`;
        cartContents.appendChild(listItem);
    });
}

// get payment details from localstorage by id and this is from JS in products page
const totalPaymentDetails = JSON.parse(localStorage.getItem('totalPaymentDetails'));
if (totalPaymentDetails) {
    document.getElementById('totalPrice').textContent = totalPaymentDetails.totalPrice;
    document.getElementById('discount').textContent = totalPaymentDetails.discount;
    document.getElementById('finalTotal').textContent = totalPaymentDetails.finalTotal;
}

const buyButton = document.getElementById('payButton');
buyButton.addEventListener('click', buyItems);

function showDialog(title, message) {
    const result = confirm(title + "\n" + message);
    if (result) {
        window.location.href = "home.html";
    }
}

function buyItems() {
    showDialog("Thankyou for Your Booking! ", "Order will be shipped immediately and prepare your money");
}