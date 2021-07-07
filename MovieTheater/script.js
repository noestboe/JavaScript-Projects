const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = movieSelect.value;

// Load from the storage first
populateUI();

// Get the data from local storage
function populateUI() {
    const selectedseats = JSON.parse(localStorage.getItem('selectedIndex'));

    if (selectedseats !== null && selectedseats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedseats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    } 
}

// Store the selected movie in local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // make a list of the indexes to the selected seats
    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));


    // store the list that is made above in local storage
    localStorage.setItem('selectedIndex', JSON.stringify(seatIndex));

    selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


// Event listener for the movie
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


// Event listener for the container
container.addEventListener('click', (e) =>  {
    if (e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();