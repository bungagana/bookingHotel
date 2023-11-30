//======= Declaration of HTML element IDs =============
const savedRoomsContainer = document.getElementById('savedRooms');

//======= Display saved rooms on load =======
document.addEventListener('DOMContentLoaded', () => {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

    if (savedItems.length > 0) {
        savedItems.forEach((roomId) => {
            displaySavedRoom(roomId);
        });
    } else {
        savedRoomsContainer.innerHTML = '<p>No saved rooms yet.</p>';
    }
});

//======= Function to display a saved room =======
function displaySavedRoom(roomId) {
    const room = getRoomById(roomId);

    if (room) {
        savedRoomsContainer.innerHTML += `
            <div class="SavedRoomCard">
                <img class="SavedRoomImage" src="images/${room.id}.png" alt="${room.name}">
                <div class="SavedRoomDetail">
                    <div class="SavedRoomName">${room.name}</div>
                    <div class="SavedRoomPrice">Price: RM ${room.price}</div>
                    <div class="SavedMaxOccupancy">Max Occupancy: ${room.maxOccupancy} person(s)</div>
                </div>
            </div>
        `;
    }
}

//======= Function to get room details by ID =======
function getRoomById(roomId) {
    // Replace with your actual room details retrieval logic
    const selectedCategory = categorySelect.value;
    const roomsInCategory = rooms[selectedCategory];

    if (roomsInCategory) {
        return roomsInCategory.find((room) => room.id === roomId);
    }

    return null;
}