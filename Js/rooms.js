//=========== Read Username data from local ==========================
const userData = JSON.parse(localStorage.getItem('registrationData'));
if (userData && userData.name) {
    // show username 
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userData.username;
}

//=========== SELECT CONTENT CATEGORIES (ARRAY) ==========================
const rooms = {
    Standard: [
        { id: 'room1', name: 'Standard Room 1', price: 100.00, maxOccupancy: 2, discount: 10 },
        { id: 'room2', name: 'Standard Room 2', price: 120.00, maxOccupancy: 3, discount: 15 },

        // Add more Standard rooms as needed
    ],
    Deluxe: [
        { id: 'room1', name: 'Deluxe Room 1', price: 150.00, maxOccupancy: 4, discount: 20 },
        { id: 'room3', name: 'Deluxe Room 2', price: 180.00, maxOccupancy: 5, discount: 25 },
        // Add more Deluxe rooms as needed
    ],
    Suite: [
        { id: 'suite1', name: 'Suite Room 1', price: 250.00, maxOccupancy: 6, discount: 30 },
        { id: 'suite2', name: 'Suite Room 2', price: 280.00, maxOccupancy: 8, discount: 35 },
        // Add more Suite rooms as needed
    ],
};

//=========== Declaration of HTML element IDs =============
const categorySelect = document.getElementById('categorySelect');
const productCategory = document.getElementById('Rooms');

const cartItems = document.getElementById('cartItems');
const cart = [];

//======= Event listeners for category selection and adding to cart ============
categorySelect.addEventListener('change', displayRooms);
productCategory.addEventListener('click', bookRoom);

//============ Display Rooms Function ====================

function displayRooms() {
    const selectedCategory = categorySelect.value;
    const roomsInCategory = rooms[selectedCategory];

    if (roomsInCategory) {
        productCategory.innerHTML = roomsInCategory
            .map(
                (room) => `
            <div class="RoomCard">
                <img class="RoomImage" src="images/${room.id}.png" alt="${room.name}">
                <div class="RoomDetail">
                    <div class="RoomName">${room.name}</div>
                    <div class="RoomPrice">Price: RM ${room.price}</div>
                    <div class="MaxOccupancy">Max Occupancy: ${room.maxOccupancy} person(s)</div>
    
                    <button data-id="${room.id}" data-name="${room.name}" data-price="${room.price}" class="BookNow">Book Now</button>

                </div>
            </div>
        `
            )
            .join('');
    }
}


//============ Add to Cart Function ====================
function bookRoom(e) {
    if (e.target.classList.contains('BookNow')) {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        const item = { id, name, price, quantity: 1 };

        //=========== Check the quantity of the room, using the find method ==========
        //====== and update the quantity of the rooms ========
        const existingItem = cart.find((cartItem) => cartItem.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }
        renderCart();
    }
}

//======= Calculate the discount based on the number of rooms ==========
function calculateDiscount(totalPrice, numRooms) {
    if (numRooms >= 5 && numRooms <= 10) {
        return totalPrice * 0.05;
    } else if (numRooms > 10) {
        return totalPrice * 0.15;
    }
    return 0;
}

//======= Format currency for display =======
function formatCurrency(amount) {
    return `RM ${amount.toFixed(2)}`;
}

//=========== Update Cart Shopping Function ==================
function renderCart() {
    cartItems.innerHTML = cart
        .map((item) => `<li>${item.name} - RM ${item.price} x ${item.quantity} = RM ${item.price * item.quantity}</li>`)
        .join('');

    // ------- Use reduce to sum up all the prices --------
    const numRooms = cart.reduce((num, item) => num + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = calculateDiscount(totalPrice, numRooms);
    const finalTotal = totalPrice - discount;

    //------- Update elements with formatted currency (RM) -------
    document.getElementById('totalPrice').textContent = formatCurrency(totalPrice);
    document.getElementById('discount').textContent = formatCurrency(discount);
    document.getElementById('finalTotal').textContent = formatCurrency(finalTotal);
}

//========== Call Display Function ============
displayRooms();

//=============== Book Button Section ====================
const bookButton = document.getElementById('buyButton');
bookButton.addEventListener('click', bookRooms);

//======= Book Rooms Function =========
// --- For sending data to payment.html ----
function bookRooms() {
    if (cart.length === 0) {
        showDialog("No rooms", "Your booking cart is empty. Add rooms to the cart before making a reservation.");
    } else {
        //------- Calculate payment details and proceed to the payment page -------
        const numRooms = cart.reduce((num, item) => num + item.quantity, 0);
        const cartItems = cart.map((item) => `${item.name} - RM ${item.price} x ${item.quantity}`);
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const discount = calculateDiscount(totalPrice, numRooms);
        const finalTotal = totalPrice - discount;

        //------- Save payment details to local storage ------
        const totalPaymentDetails = {
            totalPrice: formatCurrency(totalPrice),
            discount: formatCurrency(discount),
            finalTotal: formatCurrency(finalTotal),
        };
        localStorage.setItem('totalPaymentDetails', JSON.stringify(totalPaymentDetails));

        //------- Save cart items to local storage ---------
        localStorage.setItem('cartItems', JSON.stringify(cart));

        //------ Redirect to the payment page ----------
        window.location.href = 'payment.html';
    }

    function showDialog(title, message) {
        const result = confirm(title + "\n" + message);
    }
}