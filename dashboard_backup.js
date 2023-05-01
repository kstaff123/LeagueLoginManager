/*const addProfileBtn = document.getElementById('add-profile-btn');
const profileList = document.getElementById('profile-list');

displayProfiles();

// Add this function to save the profile and update the UI
function addProfile(rank, username, password) {
    // Save the profile to local storage
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    profiles.push({ rank, username, password });
    localStorage.setItem('profiles', JSON.stringify(profiles));

    // Add the profile to the profile list
    const profileCard = createProfileCard({ rank, username });
    profileList.appendChild(profileCard);
}

// Update the 'click' event listener for the Add Profile button
addProfileBtn.addEventListener('click', () => {
    const rankInput = document.createElement('input');
    rankInput.type = 'text';
    rankInput.placeholder = 'Rank';

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Username';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';

    // Save the profile and update the UI when the user clicks Save
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        addProfile(rankInput.value, usernameInput.value, passwordInput.value);
    });

    const newProfileForm = document.createElement('div');
    newProfileForm.appendChild(rankInput);
    newProfileForm.appendChild(usernameInput);
    newProfileForm.appendChild(passwordInput);
    newProfileForm.appendChild(saveButton);

    const profileCount = profileList.children.length;
    if (profileCount < 3) {
        profileList.appendChild(createProfileCard());
    }
    else if (profileCount === 3) {
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('carousel-container');
        const carouselWrapper = document.createElement('div');
        carouselWrapper.classList.add('flex');
        carouselWrapper.style.width = `${profileCount * 200}px`;
        Array.from(profileList.children).forEach(profileCard => {
            profileCard.classList.remove('mx-4');
            profileCard.classList.add('profile-card');
            carouselWrapper.appendChild(profileCard);
        });
        carouselContainer.appendChild(carouselWrapper);
        profileList.parentNode.replaceChild(carouselContainer, profileList);
        carouselContainer.scrollIntoView({ behavior: 'smooth' });
    }

    profileList.appendChild(newProfileForm);
});

function createProfileCard(profile = {}) {
    const profileCard = document.createElement('div');
    profileCard.classList.add('mx-4');
    profileCard.style.display = 'flex';
    profileCard.style.alignItems = 'center';
    profileCard.style.backgroundColor = '#fff';
    profileCard.style.borderRadius = '4px';
    profileCard.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
    profileCard.style.padding = '16px';
    profileCard.style.cursor = 'pointer';

    const profileBadge = document.createElement('div');
    profileBadge.classList.add('profile-badge');
    profileBadge.style.backgroundImage = `url(${profile.rank || 'https://via.placeholder.com/50'})`;
    profileCard.appendChild(profileBadge);

    const username = document.createElement('span');
    username.textContent = profile.username || 'Add Account';
    username.style.fontSize = '20px';
    profileCard.appendChild(username);

    profileCard.addEventListener('click', () => {
        loginUser(profile.username, profile.password);
    });

    return profileCard;
}

function loginUser(username, password) {
    // Log in with the saved credentials
    // Implement your automatic login
}

function displayProfiles() {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    profiles.forEach(profile => {
        const profileCard = createProfileCard(profile);
        profileList.appendChild(profileCard);
    });

    if (profileList.children.length === 0) {
        profileList.appendChild(createProfileCard());
    }
    else if (profileList.children.length > 3) {
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('carousel-container');
        const carouselWrapper = document.createElement('div');
        carouselWrapper.classList.add('flex');
        carouselWrapper.style.width = `${profileList.children.length * 200}px`;
        Array.from(profileList.children).forEach(profileCard => {
            profileCard.classList.remove('mx-4');
            profileCard.classList.add('profile-card');
            carouselWrapper.appendChild(profileCard);
        });
        carouselContainer.appendChild(carouselWrapper);
        profileList.parentNode.replaceChild(carouselContainer, profileList);
        carouselContainer.scrollIntoView({ behavior: 'smooth' });
    }
}