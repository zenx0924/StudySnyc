/*=====================================================
    StudySync AI v3
    script.js - Part 1
=====================================================*/

"use strict";

/* ==========================
   Elements
========================== */

const screens = {
    welcome: document.getElementById("welcomeScreen"),
    permission: document.getElementById("permissionScreen"),
    dashboard: document.getElementById("dashboardScreen"),
    sync: document.getElementById("syncScreen")
};

const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backToWelcome");
const continueBtn = document.getElementById("continueBtn");
const openSyncBtn = document.getElementById("openSync");
const finishBtn = document.getElementById("finishBtn");

/* ==========================
   Current Screen
========================== */

let currentScreen = "welcome";

/* ==========================
   Screen Navigation
========================== */

function hideAllScreens() {

    Object.values(screens).forEach(screen => {

        screen.classList.remove("active");

    });

}

function showScreen(name) {

    if (!screens[name]) return;

    hideAllScreens();

    screens[name].classList.add("active");

    currentScreen = name;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* ==========================
   Event Listeners
========================== */

startBtn.addEventListener("click", () => {

    showScreen("permission");

});

backBtn.addEventListener("click", () => {

    showScreen("welcome");

});

continueBtn.addEventListener("click", () => {

    showScreen("dashboard");

});

openSyncBtn.addEventListener("click", () => {

    showScreen("sync");

});

/* ==========================
   Finish Button
========================== */

finishBtn.addEventListener("click", () => {

    showScreen("dashboard");

});

/* ==========================
   Startup
========================== */

document.addEventListener("DOMContentLoaded", () => {

    showScreen("welcome");

});
/*=====================================================
    StudySync AI v3
    script.js - Part 2
=====================================================*/

"use strict";

/* ==========================
   Ripple Effect
========================== */

function createRipple(event){

    const button = event.currentTarget;

    const ripple = document.createElement("span");

    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    ripple.className = "ripple";

    ripple.style.width = size + "px";

    ripple.style.height = size + "px";

    ripple.style.left = (event.clientX - rect.left - size / 2) + "px";

    ripple.style.top = (event.clientY - rect.top - size / 2) + "px";

    button.appendChild(ripple);

    setTimeout(() => {

        ripple.remove();

    }, 650);

}

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",createRipple);

});


/* ==========================
   Permission Cards
========================== */

const permissionCards = document.querySelectorAll(".permission-card");

permissionCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-4px) scale(1.01)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});


/* ==========================
   Permission Switches
========================== */

const switches = document.querySelectorAll(".switch input");

switches.forEach(toggle=>{

    toggle.addEventListener("change",()=>{

        const card = toggle.closest(".permission-card");

        if(!card) return;

        if(toggle.checked){

            card.style.borderColor="#22C55E";

            card.style.boxShadow="0 0 25px rgba(34,197,94,.15)";

        }else{

            card.style.borderColor="rgba(255,255,255,.08)";

            card.style.boxShadow="none";

        }

    });

});


/* ==========================
   Dashboard Animation
========================== */

function animateDashboard(){

    const cards=document.querySelectorAll(

        ".hero-card,.stat-card,.course-card,.ai-card"

    );

    cards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(25px)";

        setTimeout(()=>{

            card.style.transition=".45s ease";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*120);

    });

}


/* ==========================
   Observe Dashboard
========================== */

const dashboardObserver=new MutationObserver(()=>{

    if(screens.dashboard.classList.contains("active")){

        animateDashboard();

    }

});

dashboardObserver.observe(

    screens.dashboard,

    {

        attributes:true,

        attributeFilter:["class"]

    }

);
/*=====================================================
    StudySync AI v3
    script.js - Part 3
=====================================================*/

"use strict";

/* ==========================
   Sync Elements
========================== */

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const syncStatus = document.getElementById("syncStatus");

const log1 = document.getElementById("log1");
const log2 = document.getElementById("log2");
const log3 = document.getElementById("log3");
const log4 = document.getElementById("log4");
const log5 = document.getElementById("log5");

const activityItems = document.querySelectorAll(".activity-item");

let syncStarted = false;

/* ==========================
   AI Sync
========================== */

function startSync(){

    if(syncStarted) return;

    syncStarted = true;

    finishBtn.classList.add("hidden");

    progressFill.style.width = "0%";

    progressPercent.textContent = "0%";

    activityItems.forEach(item=>{

        item.classList.remove("complete");

    });

    const stages=[

        {

            percent:20,

            message:"Connecting to AI Server...",

            log:0

        },

        {

            percent:40,

            message:"Loading Study Database...",

            log:1

        },

        {

            percent:60,

            message:"Synchronizing Learning Profile...",

            log:2

        },

        {

            percent:80,

            message:"Optimizing AI Recommendations...",

            log:3

        },

        {

            percent:100,

            message:"Setup Complete!",

            log:4

        }

    ];

    stages.forEach((stage,index)=>{

        setTimeout(()=>{

            progressFill.style.width=stage.percent+"%";

            progressPercent.textContent=stage.percent+"%";

            syncStatus.textContent=stage.message;

            activityItems[stage.log].classList.add("complete");

            if(stage.percent===100){

                log5.textContent="StudySync AI is ready.";

                finishBtn.classList.remove("hidden");

                finishBtn.animate([

                    {

                        transform:"scale(.8)",

                        opacity:0

                    },

                    {

                        transform:"scale(1)",

                        opacity:1

                    }

                ],{

                    duration:500,

                    fill:"forwards"

                });

                syncStarted=false;

            }

        },index*1500);

    });

}

/* ==========================
   Start Sync
========================== */

openSyncBtn.addEventListener("click",()=>{

    setTimeout(startSync,400);

});

/* ==========================
   Finish
========================== */

finishBtn.addEventListener("click",()=>{

    showScreen("dashboard");

});

/* ==========================
   Welcome Animation
========================== */

window.addEventListener("load",()=>{

    document.querySelectorAll(".feature-card").forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(20px)";

        setTimeout(()=>{

            card.style.transition=".45s ease";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*120);

    });

});

/* ==========================
   Console Message
========================== */

console.log(
"%cStudySync AI v3 Loaded",
"color:#22C55E;font-size:16px;font-weight:bold;"
);
/*=====================================================
    StudySync AI v3
    script.js - Part 4
=====================================================*/

"use strict";

/* ==========================
   Save Permissions
========================== */

const permissionInputs = document.querySelectorAll(".switch input");

permissionInputs.forEach((input, index) => {

    const saved = localStorage.getItem("permission_" + index);

    if (saved !== null && !input.disabled) {

        input.checked = saved === "true";

    }

    input.addEventListener("change", () => {

        localStorage.setItem(
            "permission_" + index,
            input.checked
        );

        showToast(
            input.checked
                ? "Permission Enabled"
                : "Permission Disabled"
        );

    });

});


/* ==========================
   Toast Notification
========================== */

const toast = document.createElement("div");

toast.id = "toast";

document.body.appendChild(toast);

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}


/* ==========================
   Keyboard Shortcuts
========================== */

document.addEventListener("keydown",(event)=>{

    switch(event.key){

        case "1":

            showScreen("welcome");

            break;

        case "2":

            showScreen("permission");

            break;

        case "3":

            showScreen("dashboard");

            break;

        case "4":

            showScreen("sync");

            setTimeout(startSync,300);

            break;

    }

});


/* ==========================
   Prevent Double Click Spam
========================== */

document.querySelectorAll(".primary-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        button.disabled = true;

        setTimeout(()=>{

            button.disabled = false;

        },700);

    });

});


/* ==========================
   Button Hover Sound
========================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transition=".25s";

    });

});


/* ==========================
   Page Fade Transition
========================== */

const originalShowScreen = showScreen;

showScreen = function(name){

    hideAllScreens();

    const target = screens[name];

    target.style.opacity = "0";

    target.style.display = "block";

    requestAnimationFrame(()=>{

        target.style.transition = ".35s ease";

        target.style.opacity = "1";

    });

    target.classList.add("active");

    currentScreen = name;

}


/* ==========================
   Welcome
========================== */

console.log(

"%cWelcome to StudySync AI v3",

"color:#22C55E;font-size:18px;font-weight:bold;"

);
