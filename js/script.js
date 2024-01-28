const modalBgOverlay = document.querySelector(".modal-bg-overlay");

async function getRandomUsers() {
    const response = await fetch("https://randomuser.me/api?results=12&nat=us");
    const randomUserJson = await response.json();
    const randomUserData = randomUserJson.results;

    // const user1 = randomUserData.results[0];
    // console.log(user1);
    // console.log(user1.picture.medium);
    // console.log(user1.name.first);
    // console.log(user1.name.last);
    // console.log(user1.email);
    // console.log(user1.location.city);

    let cardContent = "";
    randomUserData.map((user, index) => {
        // console.log(user);
        // console.log(index);
        const card = `
            <div class="employee-card" data-index="${index}">
                <img
                    src="${user.picture.medium}"
                    alt="${user.name.first} ${user.name.last}"
                    class="employee-img"
                />
                <div class="employee-infos" data-index="${index}">
                    <h2 class="employee-name">${user.name.first} ${user.name.last}</h2>
                    <span class="employee-email">${user.email}</span>
                    <span class="employee-city">${user.location.city}</span>
                </div>
            </div>
        `;
        // console.log(card);
        const cardContainer = document.querySelector(".card-container");
        cardContent = cardContent + card;
        cardContainer.innerHTML = cardContent;
    });
    const employeeCards = document.querySelectorAll(".employee-card");
    // console.log(employeeCards);
    // loop through each card and add a click event listener
    employeeCards.forEach(function (card) {
        card.addEventListener("click", function (e) {
            // do something when the card is clicked:
            // get the card's index from the data-index attribute (on .employee-card & .employee-infos):
            let cardIndex;
            if (e.target.className != "employee-card") {
                cardIndex = parseInt(e.target.parentNode.getAttribute("data-index"));
            } else {
                cardIndex = parseInt(e.target.getAttribute("data-index"));
            }
            // console.log("You clicked a card:", cardIndex, e.target);
            const userData = randomUserData[cardIndex];
            console.log(userData);

            // create the modal with user data content
            const modalHTML = `
                <div class="modal">
                    <span class="modal-x">X</span>
                    <img class="modal-img" src="${userData.picture.medium}" />
                    <h2 class="modal-name">${userData.name.first} ${userData.name.last}</h2>
                    <span class="modal-email">${userData.email}</span>
                    <span class="modal-city">${userData.location.city}</span>
                    <hr />
                    <span class="modal-phone">${userData.phone}</span>
                    <span class="modal-address">${userData.location.street.number} ${userData.location.street.name}, ${userData.location.state} ${userData.location.postcode}</span>
                    <span class="modal-birthday">Birthday: ${userData.dob.date}</span>
                </div>
            `;
            // show the modal
            // console.log(modalHTML);
            const modalContainer = document.querySelector(".modal-container");
            modalContainer.innerHTML = modalHTML;
            modalBgOverlay.style.display = "block";
            modalContainer.style.display = "flex";

            // MODAL FUNCTIONALITY
            const modalCloseX = document.querySelector(".modal-x");
            modalCloseX.addEventListener("click", () => {
                console.log("click");
                modalBgOverlay.style.display = "none";
                modalContainer.style.display = "none";
            });
            // console.log(modalBgOverlay);
        });
    });

    // SEARCH EMPLOYEES FUNCTIONALITY:
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keyup", (e) => {
        let inputValue = e.target.value.toLowerCase();
        console.log(inputValue);

        // check if value is in employees names:
        randomUserData.forEach((user, index) => {
            if (
                user.name.first.toLowerCase().includes(inputValue) ||
                user.name.last.toLowerCase().includes(inputValue)
            ) {
                console.log(user.name.first + " " + user.name.last);
                employeeCards[index].style.display = "flex";
            } else {
                employeeCards[index].style.display = "none";
            }
        });
    });
}

getRandomUsers();

document.querySelector("body").addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target.className === "modal-container") {
        modalBgOverlay.style.display = "none";
        document.querySelector(".modal-container").style.display = "none";
    }
});

// TODOS:
// + Employees can be filtered by name
// + Functionality has been added to switch back and forth between employees
//   when the detail modal window is open
// + Directory has been styled so that all the major elements are in place and
//   roughly matches the mockups
// + Change and update birthday date format
