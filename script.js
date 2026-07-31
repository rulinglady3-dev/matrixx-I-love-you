const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const text = "I love you";

const fontSize = 22;

let mode = "rain";

let showYu = false;

let words = [];

let heartPoints = [];

let flow = 0;


let centerX;
let centerY;



function createHeart(){

    heartPoints=[];

    centerX = canvas.width/2;
    centerY = canvas.height/2;


    for(let t=0;t<Math.PI*2;t+=0.10){

        let x = 16*Math.pow(Math.sin(t),3);

        let y =
        -(13*Math.cos(t)
        -5*Math.cos(2*t)
        -2*Math.cos(3*t)
        -Math.cos(4*t));


        let scale = Math.min(
    canvas.width,
    canvas.height
) / 38;


heartPoints.push({

    x:centerX+x*scale,

    y:centerY+y*scale

});

    }

}



class Word{


    constructor(x,y){

        this.x=x;

        this.y=y;

        this.speed=3+Math.random()*4;


        this.target=null;

        this.index=0;

    }




    update(){


        if(mode==="rain"){


            this.y+=this.speed;


            if(this.y>canvas.height+40){

                this.y=-40;

            }


        }



        else if(mode==="forming"){


            if(this.target){


                this.x += 
                (this.target.x-this.x)*0.035;


                this.y +=
                (this.target.y-this.y)*0.035;


            }


        }



        else if(mode==="flow"){


            let point =
            heartPoints[
                (this.index + Math.floor(flow))
                %
                heartPoints.length
            ];



            this.x +=
            (point.x-this.x)*0.08;


            this.y +=
            (point.y-this.y)*0.08;



        }


    }




    draw(){

        ctx.font =
        `bold ${fontSize}px Arial`;

        ctx.fillStyle="#ff69b4";


        ctx.fillText(
            text,
            this.x,
            this.y
        );

    }


}





function createRain(){

    words=[];


    for(let x=0;x<canvas.width;x+=140){


        for(let y=-300;y<canvas.height;y+=55){


            let word =
            new Word(x,y);


            words.push(word);


        }


    }


}





createHeart();

createRain();





function animate(){


    ctx.fillStyle="black";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    words.forEach((word,index)=>{


        word.index=index;


        if(mode==="forming"){


            word.target =
            heartPoints[
                index % heartPoints.length
            ];


        }



        word.update();

        word.draw();


    });



    if(mode==="flow"){


        flow+=0.15;


    }




    if(showYu){


       // =================================
// ROMANTIC YU
// =================================

const yuGradient = ctx.createLinearGradient(
    centerX - 100,
    centerY - 60,
    centerX + 100,
    centerY + 60
);

yuGradient.addColorStop(0, "#fff0fa");
yuGradient.addColorStop(0.35, "#ff9fd1");
yuGradient.addColorStop(0.7, "#ff4fa3");
yuGradient.addColorStop(1, "#ffd0e8");

ctx.save();

ctx.textAlign = "center";
ctx.textBaseline = "middle";

/* Romantik el yazısı görünümü */
ctx.font = "italic 92px 'Brush Script MT', 'Segoe Script', cursive";

/* Yumuşak pembe parlama */
ctx.shadowColor = "#ff4fa3";
ctx.shadowBlur = 28;

ctx.fillStyle = yuGradient;

/* Kalbin tam ortası */
ctx.fillText(
    "Yu",
    centerX,
    centerY + 5
);

/* İnce parlak dış çizgi */
ctx.shadowBlur = 8;
ctx.strokeStyle = "rgba(255,255,255,0.55)";
ctx.lineWidth = 1.2;

ctx.strokeText(
    "Yu",
    centerX,
    centerY + 5
);

ctx.restore();




    }



    requestAnimationFrame(animate);


}



animate();




// 7 saniye yağmur

setTimeout(()=>{

    mode="forming";

},7000);



// kalp oluşumu sonrası akış

setTimeout(()=>{

    mode="flow";

},13000);



// Yu

setTimeout(()=>{

    showYu=true;

},16000);

setTimeout(()=>{

    /* Kalp sahnesini yavaşça karart */
    canvas.style.transition =
    "opacity 1.5s ease, transform 1.5s ease";

    canvas.style.opacity = "0";

    canvas.style.transform =
    "scale(0.96)";



    /* Kalp kaybolduktan sonra soru ekranını aç */
    setTimeout(()=>{

        canvas.style.display = "none";

        startGame();

    },1500);


},21000);




window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

    createHeart();

});

const questions=[

{
text:"Did I make you smile today?",

gif:"images/smile.gif",

yesGif:"images/smile_yes.gif",

message:"I hope I made you smile",

noType:"jump",

noMessages:[
"YU,Are you sure?",
"why did you click no huhh...",
"Don't press No pleasee,LOVE MEEE"
]

},


{
text:"Do you want to hug me? 🤍",

gif:"images/hug.gif",

yesGif:"images/hug_yes.gif",

message:"A warm hug would be nice",

noType:"run",

noMessages:[
"Really? No hug?",
"This button is running away too",
"Maybe a little hug? HUGG MEE"
]

},


{
text:"Will you kiss me? 💗",

gif:"images/kiss.gif",

yesGif:"images/kiss_yes.gif",

message:"That made me happy",

noType:"teleport",

noMessages:[
"Are you sure? WHYY YUUU",
"The No button is shy noww",
"Maybe try again pleasee, KİSS MEEE"
]

},


{
text:"Do you want to spend more time with me?",

gif:"images/time.gif",

yesGif:"images/time_yes.gif",

message:"Then click the next site I sent you 💌",

noType:"crazy",

noMessages:[
"Don't leave yet,Stay with me ",
"One more moment?",
"The story isn't finished"
]

}

];

let questionIndex=0;



const gameScreen=
document.getElementById("gameScreen");


const nextScreen=
document.getElementById("nextScreen");


const questionText=
document.getElementById("questionText");


const gameGif=
document.getElementById("gameGif");

const questionBox = document.getElementById("questionBox");
const buttons = document.querySelector(".buttons");


const gifMessage=
document.getElementById("gifMessage");

const noReaction =
document.getElementById("noReaction");

const yesBtn=
document.getElementById("yesBtn");


const noBtn=
document.getElementById("noBtn");

function startGame(){

    questionIndex = 0;

    gameScreen.style.display="flex";

    gameScreen.classList.remove("showGame");


    setTimeout(()=>{

        gameScreen.classList.add("showGame");

    },50);


questionBox.classList.remove("showQuestionBox");


setTimeout(()=>{

questionBox.classList.add("showQuestionBox");

showQuestion();

},300);

}


function showQuestion(){

   questionBox.classList.remove("showQuestionBox");
   gameGif.classList.remove("showGif");
   buttons.classList.remove("showButtons");

    let q=questions[questionIndex];


    questionText.textContent=q.text;


    gameGif.src=q.gif;


    gifMessage.textContent="";


    noBtn.style.left="auto";

    noBtn.style.top="auto";

    noTouchedOnce = false;

    setTimeout(()=>{

    questionBox.classList.add("showQuestionBox");

},100);


setTimeout(()=>{

    gameGif.classList.add("showGif");

},600);


setTimeout(()=>{

    buttons.classList.add("showButtons");

},1100);


}



yesBtn.onclick=function(){


    let q=questions[questionIndex];


    gameGif.src=q.yesGif;


    gifMessage.textContent=q.message;



    setTimeout(()=>{


        questionIndex++;


        if(questionIndex < questions.length){


            showQuestion();


        }

        else{


            gameScreen.style.display="none";


            nextScreen.style.display="flex";


        }



    },4000);



};

noBtn.onclick=function(){


let q = questions[questionIndex];


let random =
Math.floor(
Math.random()*q.noMessages.length
);



noReaction.textContent =
q.noMessages[random];


noReaction.style.opacity="1";



setTimeout(()=>{

noReaction.style.opacity="0";

},2000);



};


function moveNoButton(){

    let q = questions[questionIndex];


    if(q.noType === "jump"){

        noBtn.style.transform =
        "translateY(-40px)";

        setTimeout(()=>{

            noBtn.style.transform =
            "translateY(0)";

        },300);

    }


    if(q.noType === "run"){

        noBtn.style.left =
        Math.random()*70 + "%";

        noBtn.style.top =
        Math.random()*70 + "%";

    }


    if(q.noType === "teleport"){

        noBtn.style.left =
        Math.random() *
        (window.innerWidth-150)
        +"px";

        noBtn.style.top =
        Math.random() *
        (window.innerHeight-80)
        +"px";

    }


    if(q.noType === "crazy"){

        noBtn.style.left =
        Math.random()*80+"%";

        noBtn.style.top =
        Math.random()*80+"%";

        noBtn.style.transform =
        "rotate("+
        Math.random()*360+
        "deg) scale(1.2)";

    }

}


/* Bilgisayarda fare yaklaşınca */

noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);


/* iPad ve telefonda dokununca */

let noTouchedOnce = false;


noBtn.addEventListener(
    "touchstart",
    function(event){

        event.preventDefault();


        /* İlk dokunuşta sadece kaç */

        if(!noTouchedOnce){

            noTouchedOnce = true;

            moveNoButton();

            return;

        }


        /* İkinci dokunuşta mesajı göster */

        noBtn.click();

    }
);

const nextBtn = document.getElementById("nextBtn");

nextBtn.onclick = function(){

    window.location.href =
    "https://rulinglady3-dev.github.io/New-gif/";

};
