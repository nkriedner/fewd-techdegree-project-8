async function getRandomUsers() {
    const response = await fetch("https://randomuser.me/api?results=12&nat=us");
    const randomUserData = await response.json();

    // const user1 = randomUserData.results[0];
    // console.log(user1);
    // console.log(user1.picture.medium);
    // console.log(user1.name.first);
    // console.log(user1.name.last);
    // console.log(user1.email);
    // console.log(user1.location.city);

    // Insert user1 in employee-card
    const employeeCard = document.querySelector(".employee-card");

    let cardContent = "";
    randomUserData.results.map((user) => {
        // console.log(user);
        const card = `
            <div class="employee-card">
                <img
                    src="${user.picture.medium}"
                    alt="${user.name.first} ${user.name.last}"
                    class="employee-img"
                />
                <div class="employee-infos">
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
}

getRandomUsers();

// TODOS:
// + Employees can be filtered by name
// + Modal window displays image, name, email, cell number, detailed address
//   (including street name and number, city, state and post code), birthdate
// + There is a way to close the modal window
// + Functionality has been added to switch back and forth between employees
//   when the detail modal window is open
// + Directory has been styled so that all the major elements are in place and
//   roughly matches the mockups
