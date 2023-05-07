//main after login
document.addEventListener("DOMContentLoaded", () => {
    function launchAndLogin(username, password) {
        electronAPI.send('launch-and-login', { username, password });

    }

    window.launchAndLogin = launchAndLogin;

    // Save and load previous accounts/profiles
    function saveState(state) {
        localStorage.setItem("appState", JSON.stringify(state));
    }

    function loadState() {
        const stateJSON = localStorage.getItem("appState");
        if (stateJSON) {
            return JSON.parse(stateJSON);
        }
        return null;
    }

    const swiperWrapper = document.querySelector(".swiper-wrapper");
    const addAccountModal = document.getElementById("addAccountModal");
    const addAccountForm = document.getElementById("addAccountForm");

    function addAccountButtonListener() {
        swiperWrapper.addEventListener("click", (event) => {
            if (event.target.classList.contains("accountButton")) {
                console.log("clicked");
                addAccountModal.classList.remove("hidden");
            }
        });
    }
    addAccountButtonListener();

    addAccountModal.addEventListener("click", closeModal);
    window.addAccountButtonListener = addAccountButtonListener;

    //Close account form modal
    function closeModal(event) {
        const modalContent = addAccountModal.querySelector(".bg-white");
        if (!modalContent.contains(event.target)) {
            addAccountModal.classList.add("hidden");
        }
    }

    const savedState = loadState();
    if (savedState) {
        swiperWrapper.innerHTML = savedState;
    }

    //inserts html and css for filled out profile
    function addAccountSlide(rank, username, password) {
        const swiperWrapper = document.querySelector(".swiper-wrapper");
        const newSlide = document.createElement("div");
        newSlide.classList.add("swiper-slide");
        newSlide.innerHTML = `
            <div class="flex justify-center space-x-6 overflow-x-auto py-10">
                <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-48">
                    <img src="/rankicons/${rank}.png" alt="Rank Badge" class="w-24 h-24">
                    <h2 class="text-xl font-semibold mt-2">${username}</h2>
                    <button class="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onclick="launchAndLogin('${username}', '${password}')">Login</button>
                </div>
            </div>
        `;
        swiperWrapper.insertBefore(newSlide, swiperWrapper.querySelector(".swiper-slide:last-child"));
    }



    //adds empty profile placeholder
    function createEmptySlide() {
        const swiperWrapper = document.querySelector(".swiper-wrapper");
        const newSlide = document.createElement("div");
        newSlide.classList.add("swiper-slide");
        newSlide.innerHTML = `
        <div class="flex justify-center space-x-6 overflow-x-auto py-10">
            <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-48">
                <div class="bg-gray-300 w-24 h-24 rounded-full"></div>
                <div class="m-3.5"></div>
                <button class="bg-green-500 text-white px-4 py-2 mt-6 rounded">Add Account</button>
            </div>
        </div>
      `;
        swiperWrapper.appendChild(newSlide);
        addAccountButtonListener();
    }

    addAccountForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const rank = event.target.elements.rank.value;
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        //finds empty slide to fill 
        if (rank && username && password) {
            const emptySlides = swiperWrapper.querySelectorAll('.swiper-slide');
            let emptySlideFound = false;

            for (let i = 0; i < emptySlides.length; i++) {
                const emptySlide = emptySlides[i];
                if (emptySlide.querySelector('.bg-gray-300')) {
                    emptySlide.innerHTML = `
                        <div class="flex justify-center space-x-6 overflow-x-auto py-10">
                            <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-48">
                                <img src="/rankicons/${rank}.png" alt="Rank Badge" class="w-24 h-24">
                                <h2 class="text-xl font-semibold mt-2">${username}</h2>
                                <button class="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onclick="launchAndLogin('${username}', '${password}')">Login</button>
                            </div>
                        </div>
                    `;
                    emptySlideFound = true;
                    break;
                }
            }

            if (!emptySlideFound) {
                addAccountSlide(rank, username, password);
            }
            createEmptySlide();

            addAccountModal.classList.add("hidden");
            addAccountForm.reset();

            const swiperInstance = document.getElementById("mySwiper").swiper;
            swiperInstance.update(); // Update the swiper after adding slides
        }
    });




    window.addEventListener('unload', () => {
        saveState(swiperWrapper.innerHTML);
    });

});