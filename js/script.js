/*==================================================
    StudySync AI V4
    script.js - Part 1
==================================================*/

/*=========================
    Elements
=========================*/

const screens = {

    splash: document.getElementById("splashScreen"),

    welcome: document.getElementById("welcomeScreen"),

    permission: document.getElementById("permissionScreen"),

    dashboard: document.getElementById("dashboardScreen"),

    sync: document.getElementById("syncScreen")

};

const startBtn = document.getElementById("startBtn");

const permissionNext = document.getElementById("permissionNext");

const openSync = document.getElementById("openSync");

const finishBtn = document.getElementById("finishBtn");

/*=========================
    Screen Manager
=========================*/

function showScreen(screen){

    Object.values(screens).forEach(current=>{

        current.classList.remove("active");

    });

    screen.classList.add("active");

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*=========================
    Splash Animation
=========================*/

window.addEventListener("load",()=>{

    showScreen(screens.splash);

    setTimeout(()=>{

        showScreen(screens.welcome);

    },2500);

});

/*=========================
    Navigation Buttons
=========================*/

startBtn.addEventListener("click",()=>{

    showScreen(screens.permission);

});

permissionNext.addEventListener("click",()=>{

    showScreen(screens.dashboard);

});

openSync.addEventListener("click",()=>{

    showScreen(screens.sync);

});
/*==================================================
    StudySync AI V4
    script.js - Part 2
==================================================*/

/*=========================
    Sync Elements
=========================*/

const progressFill = document.getElementById("progressFill");

const progressPercent = document.getElementById("progressPercent");

const syncStatus = document.getElementById("syncStatus");

const activityLogs = [

    document.getElementById("log1"),

    document.getElementById("log2"),

    document.getElementById("log3"),

    document.getElementById("log4")

];

/*=========================
    Sync Animation
=========================*/

function startSync(){

    let progress = 0;

    const messages = [

        "Connecting to AI...",

        "Analyzing study habits...",

        "Generating smart recommendations...",

        "Finalizing dashboard..."

    ];

    syncStatus.textContent = messages[0];

    activityLogs.forEach(log=>{

        log.classList.remove("active");

    });

    activityLogs[0].classList.add("active");

    finishBtn.classList.add("hidden");

    progressFill.style.width="0%";

    progressPercent.textContent="0%";

    const timer=setInterval(()=>{

        progress+=2;

        progressFill.style.width=progress+"%";

        progressPercent.textContent=progress+"%";

        if(progress>=25){

            activityLogs[0].classList.add("active");

            syncStatus.textContent=messages[0];

        }

        if(progress>=50){

            activityLogs[1].classList.add("active");

            syncStatus.textContent=messages[1];

        }

        if(progress>=75){

            activityLogs[2].classList.add("active");

            syncStatus.textContent=messages[2];

        }

        if(progress>=95){

            activityLogs[3].classList.add("active");

            syncStatus.textContent=messages[3];

        }

        if(progress>=100){

            clearInterval(timer);

            progress=100;

            progressFill.style.width="100%";

            progressPercent.textContent="100%";

            syncStatus.textContent="StudySync AI is Ready!";

            finishBtn.classList.remove("hidden");

        }

    },70);

}

/*=========================
    Start Sync
=========================*/

openSync.addEventListener("click",()=>{

    showScreen(screens.sync);

    startSync();

});
/*==================================================
    StudySync AI V4
    script.js - Part 3
==================================================*/

/*=========================
    Finish Button
=========================*/

finishBtn.addEventListener("click",()=>{

    showScreen(screens.dashboard);

    animateStats();

});

/*=========================
    Animated Statistics
=========================*/

function animateValue(element,target,suffix=""){

    let current=0;

    const step=Math.max(1,Math.ceil(target/40));

    const timer=setInterval(()=>{

        current+=step;

        if(current>=target){

            current=target;

            clearInterval(timer);

        }

        element.textContent=current+suffix;

    },25);

}

function animateStats(){

    const values=document.querySelectorAll(".stat-card h4");

    if(values.length<3)return;

    animateValue(values[0],12);

    animateValue(values[1],5,"h");

    animateValue(values[2],96,"%");

}

/*=========================
    Permission Switches
=========================*/

document.querySelectorAll(".switch input").forEach(toggle=>{

    toggle.addEventListener("change",()=>{

        const card=toggle.closest(".permission-card");

        if(toggle.checked){

            card.style.borderColor="rgba(34,197,94,.5)";
            card.style.boxShadow="0 0 18px rgba(34,197,94,.18)";

        }else{

            card.style.borderColor="rgba(255,255,255,.08)";
            card.style.boxShadow="none";

        }

    });

});

/*=========================
    Bottom Navigation
=========================*/

const navItems=document.querySelectorAll(".nav-item");

navItems.forEach(item=>{

    item.addEventListener("click",()=>{

        navItems.forEach(btn=>{

            btn.classList.remove("active");

        });

        item.classList.add("active");

    });

});

/*=========================
    Ripple Effect
=========================*/

document.querySelectorAll(".primary-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        button.animate(

            [

                {

                    transform:"scale(1)"

                },

                {

                    transform:"scale(.96)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:220,

                easing:"ease-out"

            }

        );

    });

});
/*==================================================
    StudySync AI V4
    script.js - Part 4
==================================================*/

/*=========================
    Floating Logo Animation
=========================*/

document.querySelectorAll(".logo").forEach(logo=>{

    logo.animate(

        [

            {

                transform:"translateY(0px)"

            },

            {

                transform:"translateY(-10px)"

            },

            {

                transform:"translateY(0px)"

            }

        ],

        {

            duration:3000,

            iterations:Infinity,

            easing:"ease-in-out"

        }

    );

});

/*=========================
    Fade-in Cards
=========================*/

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.animate(

                [

                    {

                        opacity:0,

                        transform:"translateY(30px)"

                    },

                    {

                        opacity:1,

                        transform:"translateY(0)"

                    }

                ],

                {

                    duration:700,

                    easing:"ease"

                }

            );

        }

    });

});

document.querySelectorAll(

    ".permission-card,.course-card,.stat-card,.insight-card"

).forEach(card=>{

    observer.observe(card);

});

/*=========================
    Ambient Background
=========================*/

const lights=document.querySelectorAll(".bg-light");

let angle=0;

function animateLights(){

    angle+=0.003;

    lights.forEach((light,index)=>{

        const radius=index===0?30:25;

        const x=Math.cos(angle+(index*2))*radius;

        const y=Math.sin(angle+(index*2))*radius;

        light.style.transform=`translate(${x}px, ${y}px)`;

    });

    requestAnimationFrame(animateLights);

}

animateLights();

/*=========================
    Keyboard Shortcuts
=========================*/

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

            startSync();

            break;

    }

});

/*=========================
    Console Message
=========================*/

console.log(

`%cStudySync AI V4

Developed for Educational Purposes

Status: Ready ✓`,

"color:#22C55E;font-size:16px;font-weight:bold;"

);

/*=========================
    Initialization
=========================*/

document.addEventListener("DOMContentLoaded",()=>{

    showScreen(screens.splash);

});
