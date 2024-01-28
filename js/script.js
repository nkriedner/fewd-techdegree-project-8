const modalBgOverlay = document.querySelector(".modal-bg-overlay");
const modalContainer = document.querySelector(".modal-container");

function createModalHTML(randomUserData, userData, cardIndex) {
    // format birthday date (credit & thanks to stackoverflow):
    const birthday = new Date(userData.dob.date);
    const yyyy = birthday.getFullYear();
    let mm = birthday.getMonth() + 1; // Months start at 0!
    let dd = birthday.getDate();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    const formattedBirthday = dd + "/" + mm + "/" + yyyy;
    console.log(formattedBirthday);

    // create the modal with user data content:
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
                    <span class="modal-birthday">Birthday: ${formattedBirthday}</span>
                    <span class="previous-profile">&lAarr;</span>
                    <span class="next-profile">&rAarr;</span>
                </div>
            `;
    // show the modal:
    modalContainer.innerHTML = modalHTML;
    modalBgOverlay.style.display = "block";
    modalContainer.style.display = "flex";

    // MODAL CLOSING FUNCTIONALITY
    const modalCloseX = document.querySelector(".modal-x");
    modalCloseX.addEventListener("click", () => {
        modalBgOverlay.style.display = "none";
        modalContainer.style.display = "none";
    });

    // NEXT & PREVIOUS PROFILE FUNCTIONALITY
    const previousProfileBtn = document.querySelector(".previous-profile");
    const nextProfileBtn = document.querySelector(".next-profile");

    previousProfileBtn.addEventListener("click", () => {
        // define next profile-index (add 1):
        if (cardIndex === 0) {
            cardIndex = 11;
        } else {
            cardIndex--;
        }
        // create html for next profile modal
        return createModalHTML(randomUserData, randomUserData[cardIndex], cardIndex);
    });
    nextProfileBtn.addEventListener("click", () => {
        // define next profile-index (add 1):
        if (cardIndex === 11) {
            cardIndex = 0;
        } else {
            cardIndex++;
        }
        // create html for next profile modal
        return createModalHTML(randomUserData, randomUserData[cardIndex], cardIndex);
    });
}

async function getRandomUsers() {
    const response = await fetch("https://randomuser.me/api?results=12&nat=us");
    const randomUserJson = await response.json();
    const randomUserData = randomUserJson.results;

    let cardContent = "";
    randomUserData.map((user, index) => {
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
        const cardContainer = document.querySelector(".card-container");
        cardContent = cardContent + card;
        cardContainer.innerHTML = cardContent;
    });
    const employeeCards = document.querySelectorAll(".employee-card");

    // loop through each card and add a click event listener
    employeeCards.forEach(function (card) {
        card.addEventListener("click", function (e) {
            // get the card's index from the data-index attribute (on .employee-card & .employee-infos):
            let cardIndex;
            if (e.target.className != "employee-card") {
                cardIndex = parseInt(e.target.parentNode.getAttribute("data-index"));
            } else {
                cardIndex = parseInt(e.target.getAttribute("data-index"));
            }
            const userData = randomUserData[cardIndex];

            createModalHTML(randomUserData, userData, cardIndex);
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
// + Directory has been styled so that all the major elements are in place and
//   roughly matches the mockups
// + Change and update birthday date format
