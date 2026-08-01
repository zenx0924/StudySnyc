/* =====================================================
   StudySync AI
   script.js - Part 1
   Navigation & Screen Management
===================================================== */

// =============================
// Screen References
// =============================

const screens = {
    welcome: document.getElementById("welcome-screen"),
    permission: document.getElementById("permission-screen"),
    dashboard: document.getElementById("dashboard-screen"),
    sync: document.getElementById("sync-screen")
};

// =============================
// Buttons
// =============================

const startButton = document.getElementById("startButton");
const continueBtn = document.getElementById("continueBtn");
const finishBtn = document.getElementById("finishBtn");

const backButton = document.querySelector(".back-btn");

// =============================
// Navigation
// =============================

function hideAllScreens() {

    Object.values(screens).forEach(screen => {

        screen.classList.remove("active");

    });

}

function showScreen(screen) {

    hideAllScreens();

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// =============================
// Welcome
// =============================

if (startButton) {

    startButton.addEventListener("click", () => {

        showScreen(screens.permission);

    });

}

// =============================
// Back Button
// =============================

if (backButton) {

    backButton.addEventListener("click", () => {

        showScreen(screens.welcome);

    });

}

// =============================
// Continue
// =============================

if (continueBtn) {

    continueBtn.addEventListener("click", () => {

        showScreen(screens.dashboard);

    });

}

// =============================
// Dashboard → Sync
// =============================

const floatingAI = document.querySelector(".floating-ai");

if (floatingAI) {

    floatingAI.addEventListener("click", () => {

        showScreen(screens.sync);

    });

}

// =============================
// Finish Button
// =============================

if (finishBtn) {

    finishBtn.addEventListener("click", () => {

        showScreen(screens.dashboard);

    });

}

// =============================
// Initial Screen
// =============================

showScreen(screens.welcome);
/* =====================================================
   StudySync AI
   script.js - Part 2
   Permissions & UI Interactions
===================================================== */

// =============================
// Permission Switches
// =============================

const allowAllBtn = document.getElementById("allowAllBtn");
const switches = document.querySelectorAll(
    ".permission-card input[type='checkbox']"
);

// Allow All Button
if (allowAllBtn) {

    allowAllBtn.addEventListener("click", () => {

        switches.forEach(toggle => {

            toggle.checked = true;

        });

        allowAllBtn.textContent = "✓ All Permissions Enabled";

        setTimeout(() => {

            allowAllBtn.textContent = "Allow All";

        }, 1800);

    });

}

// =============================
// Permission Card Animation
// =============================

const permissionCards = document.querySelectorAll(".permission-card");

permissionCards.forEach(card => {

    card.addEventListener("click", (event) => {

        // Prevent double-toggle when clicking directly on the checkbox
        if (event.target.tagName === "INPUT") return;

        const checkbox = card.querySelector("input");

        if (!checkbox) return;

        checkbox.checked = !checkbox.checked;

    });

});

// =============================
// Bottom Navigation
// =============================

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navItems.forEach(nav => {

            nav.classList.remove("active");

        });

        item.classList.add("active");

    });

});

// =============================
// Floating AI Button Animation
// =============================

if (floatingAI) {

    floatingAI.addEventListener("mousedown", () => {

        floatingAI.style.transform = "scale(.94)";

    });

    floatingAI.addEventListener("mouseup", () => {

        floatingAI.style.transform = "";

    });

    floatingAI.addEventListener("mouseleave", () => {

        floatingAI.style.transform = "";

    });

}

// =============================
// Hero Card Button
// =============================

const askAIButton = document.querySelector(".hero-card .primary-btn");

if (askAIButton) {

    askAIButton.addEventListener("click", () => {

        alert(
            "🤖 AI Assistant\n\nThis is a fictional interface created for a short film."
        );

    });

}

// =============================
// Small Fade Animation
// =============================

document.querySelectorAll(".glass-card, .feature-card, .task-card, .note-card")
.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-4px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});
/* =====================================================
   StudySync AI
   script.js - Part 3
   Sync Animation
===================================================== */

// =============================
// Sync Elements
// =============================

const syncProgress = document.getElementById("syncProgress");
const progressText = document.getElementById("progressText");
const syncMessage = document.getElementById("syncMessage");

let syncRunning = false;

// Fictional messages for the short film
const syncMessages = [

    "Initializing AI Engine...",

    "Loading Study Planner...",

    "Connecting Learning Database...",

    "Analyzing Study Habits...",

    "Building Personalized Dashboard...",

    "Optimizing AI Recommendations...",

    "Synchronizing Cloud Data...",

    "Preparing Smart Notes...",

    "Finalizing Setup...",

    "Synchronization Complete."

];

// =============================
// Sync Animation
// =============================

function startSync(){

    if(syncRunning) return;

    syncRunning = true;

    let progress = 0;

    let messageIndex = 0;

    syncProgress.style.width = "0%";
    progressText.textContent = "0%";

    const timer = setInterval(()=>{

        progress += Math.floor(Math.random()*6)+2;

        if(progress > 100){

            progress = 100;

        }

        syncProgress.style.width = progress + "%";

        progressText.textContent = progress + "%";

        if(messageIndex < syncMessages.length){

            syncMessage.textContent = syncMessages[messageIndex];

        }

        if(progress > (messageIndex+1)*10){

            messageIndex++;

        }

        if(progress >= 100){

            clearInterval(timer);

            syncMessage.textContent = "✅ Synchronization Complete";

            if(finishBtn){

                finishBtn.disabled = false;

                finishBtn.textContent = "Open Dashboard";

            }

            syncRunning = false;

        }

    },250);

}

// =============================
// Start Sync Automatically
// =============================

if(floatingAI){

    floatingAI.addEventListener("click",()=>{

        setTimeout(startSync,400);

    });

}

// =============================
// Restart Sync Every Visit
// =============================

if(finishBtn){

    finishBtn.addEventListener("click",()=>{

        syncProgress.style.width = "0%";

        progressText.textContent = "0%";

        syncMessage.textContent = "Initializing AI Engine...";

    });

}

// =============================
// Keyboard Shortcuts (Demo)
// =============================

document.addEventListener("keydown",(event)=>{

    switch(event.key){

        case "1":

            showScreen(screens.welcome);
            break;

        case "2":

            showScreen(screens.permission);
            break;

        case "3":

            showScreen(screens.dashboard);
            break;

        case "4":

            showScreen(screens.sync);

            setTimeout(startSync,300);

            break;

    }

});

console.log("🎓 StudySync AI Loaded Successfully");
