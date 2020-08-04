

//initialize all variables

var canvas = document.getElementById("myCanvas");
var img = document.getElementById("life");
var img1 = document.getElementById("brick");
var img2 = document.getElementById("paddle");
var img3 = document.getElementById("ball");

//all bricks used

var img4 = document.getElementById("wbrick");
var img5 = document.getElementById("back1");
var img6 = document.getElementById("ybrick");
var img7 = document.getElementById("bbrick");
var img8 = document.getElementById("gbrick");
var img9 = document.getElementById("blbrick");
var img10 = document.getElementById("mainback");
var img11 = document.getElementById("mainback1");
var mg = document.getElementById("margame");
var mn = document.getElementById("marnew");


//mario theme scenarios
var marior1=document.getElementById("mar1");
var marior2=document.getElementById("mar2");
var marior3=document.getElementById("mar3");
var marior4=document.getElementById("mar4");
var marior5=document.getElementById("mar5");
var marior6=document.getElementById("mario6");
var mariomushroom1=document.getElementById("marmush1");
var mariomushroom2=document.getElementById("marmush2");
var blueblock=document.getElementById("blblock");
var brownblock=document.getElementById("brblock");
var yellowblock=document.getElementById("yblock");
var powerblock=document.getElementById("pblock");


var ctx = canvas.getContext("2d");


//main theme scenarios
var r1=document.getElementById("rd1");
var r2=document.getElementById("rd2");
var r3=document.getElementById("rd3");
var r4=document.getElementById("rd4");
var r5=document.getElementById("rd5");
var r6=document.getElementById("rd6");


var x = canvas.width/2;
var y = canvas.height-30;
var dx,dy;
var pht = 57;    
var pwd;        
var px = (canvas.width-pwd)/2;
var rightside = false;
var leftside = false;
var rows,inc;
var cols = 12;
var bwd = 75;
var bht = 75;
var padding = 1;
var offsettop = 2;
var offsetleft = 2;
var score = 0;
var lives = 3;
var round,blank,yellowbrick;
var rad;
var mariostatus,stat,remb,remw,rems;




//show score

function tscore() {
    ctx.font = "18px Bold Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: "+score, 8, 20);
}


//array to store bricks 

var bricks = [];





//event handlers used

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", keyPressHandler, false);
document.addEventListener("Cpress", CPressHandler, false);


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightside = true;
        console.log(e);
        
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftside = true;
        
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightside = false;
        
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftside = false;
        
    }
}


function keyPressHandler(e)
{
    
    if(e.key == "Enter" && stat == 1) {
        window.location.replace("rounds.html");   
    }
    else if(e.key == "Enter" && round == 5) {
        back();   
    }
    console.log(e);

}

function CPressHandler(e)
{
    var req=sessionStorage.getItem("diff");

    if(e.key == "c" || e.key == "C") 
    {
    setup(req);
    }
    console.log(e);

}










//show the lives remaining

function livesshow() {
    ctx.font = "16px Arial";
    for (var i = 0; i < lives; i++)
    ctx.drawImage(img,canvas.width-65-(25*i), 10);
    
}



//called when ball collides with bricks


function hittarget() {
    for (var c = 0; c < cols; c++) {
        for (var r = 0; r < rows; r++) {
            var b = bricks[c][r];
            if (b.status == 2) {
                if (x > b.x && x < b.x + bwd && y > b.y && y < b.y + bht) {
                    
                    dy = -dy;


                    if(mariostatus==1)
                    {
                        if(rad==15)
                        new Audio("music/bigballbrownbluesmash.mp3").play();    
                        else
                        new Audio("music/breakyellowblockmario.mp3").play();    
                    }
                    else
                    new Audio("music/bounce.mp3").play();

                if(rad==15)
                {
                    b.status=0;
                    score++;
                }
                else
                b.status--;
                }
            }
            else if (b.status == 4) {
                if (x > b.x && x < b.x + bwd && y > b.y && y < b.y + bht) {
                    dy = -dy;

                    if(mariostatus==1)
                    new Audio("music/breakyellowblockmario.mp3").play();
                    else    
                    new Audio("music/bounce.mp3").play();
                    b.status = 4;
                }
            }
            else if (b.status == 5) {
                if (x > b.x && x < b.x + bwd && y > b.y && y < b.y + bht) {
                    dy = -dy;
                    if(mariostatus==1)
                    new Audio("music/growmushroom.mp3").play();
                    else    
                    new Audio("music/bounce.mp3").play();
                    rad=15;
                    b.status = 1;
                    remb=1000;
                }
            }
            else if (b.status == 6) {
                if (x > b.x && x < b.x + bwd && y > b.y && y < b.y + bht) {
                    dy = -dy;
                    
                    if(mariostatus==1)
                    new Audio("music/blackmushroom.wav").play();
                    else
                    new Audio("music/bounce.mp3").play();

                    dx=8;
                    dy=-8;
                    b.status = 1;
                    rems=1000;
                }
            }
            else if (b.status == 7) {
                if (x > b.x && x < b.x + bwd && y > b.y && y < b.y + bht) {
                    dy = -dy;
                    
                    if(mariostatus==1)
                    new Audio("music/growmushroom.mp3").play();
                    else
                    new Audio("music/bounce.mp3").play();
                    
                    pwd = 180;
                    b.status = 1;
                    remw=1000;
                }
            }
            else if (b.status == 1) {
                if (x > b.x && x < b.x + bwd && y > b.y && y < b.y + bht) {
                    dy = -dy;
                    

                    if(mariostatus==1)
                    new Audio("music/breakbrownblk.mp3").play();
                    else
                    new Audio("music/bounce.mp3").play();

                    b.status = 0;
                    score++;


                    if(score == ((rows*cols)-yellowbrick-blank)) {
                    
                        

                        if(mariostatus==1)
                        new Audio("music/marioclearstage.wav").play();
                        else
                        new Audio("music/fireworksfinale.mp3").play();
                        
                        if((round==null || round==""))
                        {
                            if(mariostatus==1)
                            {var t=document.getElementById("audiomario1");
                                t.pause();
                            }
                            else
                            {
                            var t=document.getElementById("audion");
                            t.pause();
                            }
                        }
                        else
                        stopmusic(1);


                        
                        stat=1;
                        
                        
                            if(round==null || round=="")
                            {
                             
                                    
                            if(mariostatus==1)    
                            {ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(mg,1,1);
                            ctx.drawImage(blueblock,170, 230);
                            ctx.fillStyle = "#FFFFFF";
                            ctx.font = "23px bold Lucida Handwriting";
                            ctx.fillText("--BLUE BLOCKS need to be hit twice(except with large ball)",285, 280);
                            }
                            else    
                            {ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(img10,1,1);
                            ctx.drawImage(img4,170, 300);
                            ctx.fillStyle = "#FFFFFF";
                            ctx.font = "23px bold Lucida Handwriting";
                            ctx.fillText("--WHITE BRICKS need to be hit twice(except with large ball)",285, 340);
                            }
                            }

                            else if(round==2)
                            {
                            if(mariostatus==1)        
                            {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(mg,1,1);
                            ctx.drawImage(yellowblock,170,230);
                            ctx.fillStyle = "#FFFFFF";
                            ctx.font = "23px bold Lucida Handwriting";
                            ctx.fillText("--YELLOW BLOCKS are static blocks.",285, 280);
                            }
                            else
                            {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(img10,1,1);
                                ctx.drawImage(img6,170,300);
                                ctx.fillStyle = "#FFFFFF";
                                ctx.font = "23px bold Lucida Handwriting";
                                ctx.fillText("--YELLOW BRICKS are static bricks.",285, 340);    
                            }
                            }
                            else if(round==3)
                            {
                                if(mariostatus==1)        
                                {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(mg,1,1);
                                ctx.drawImage(mariomushroom1,170,230);
                                ctx.fillStyle = "#FFFFFF";
                                ctx.font = "23px bold Lucida Handwriting";
                                ctx.fillText("--BROWN MUSHROOM inceases size of ball. ",285, 280);
                                }
                                else
                                {
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(img10,1,1);
                                ctx.drawImage(img7,170,300);
                                ctx.fillStyle = "#FFFFFF";
                                ctx.font = "23px bold Lucida Handwriting";
                                ctx.fillText("--BROWN BRICKS inceases size of ball. ",285, 340);
                                }

                                if(mariostatus==1)        
                                {
                                
                                ctx.drawImage(mariomushroom2,170,320);
                                ctx.fillStyle = "#FFFFFF";
                                ctx.font = "23px bold Lucida Handwriting";
                                ctx.fillText("--BLACK MUSHROOM increases speed of the ball.",285, 380);
                                }
                                else
                                {
                                    ctx.drawImage(img9,170,340);
                                ctx.fillStyle = "#FFFFFF";
                                ctx.font = "23px bold Lucida Handwriting";
                                ctx.fillText("--BLACK BRICKS increase speed of the ball.",285, 430);
                                }
                            }

                            else if(round==4)
                            {
                                if(mariostatus==1)
                                {        
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(mg,1,1);
                                    ctx.drawImage(powerblock,170,230);
                                    ctx.fillStyle = "#FFFFFF";
                                    ctx.font = "23px bold Lucida Handwriting";
                                    ctx.fillText("--POWER BLOCKS increases paddle size.",285, 280);
                                }
                                else
                                {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(img10,1,1);
                                    ctx.drawImage(img8,170,300);
                                    ctx.fillStyle = "#FFFFFF";
                                    ctx.font = "23px bold Lucida Handwriting";
                                    ctx.fillText("--GREY BRICKS increases paddle size.",285, 340);    
                                    
                                }
                            }
                            if(round==5)
                            {
                                ctx.font="35px Bold Arial";
                                ctx.fillStyle = "#000000";
                                ctx.fillText("CONGRATULATIONS!!!YOU WON!!!!",135, 150);
                                stat=0;
                                about();
                            }
                            else if(round<5 || round==null || round=="")
                            ctx.fillText("CONGRATULATIONS!!!ROUND CLEARED..PRESS ENTER TO GO TO NEXT ROUND",35, 50);
                            
                            console.log("round:"+round+"yellow"+yellowbrick);
                            console.log("round:"+round+"blank"+blank);    
                        
                             
                        clearInterval(interval);    
                    }
                }
            }
        }
    }
}



//display the end credits at game end

function about()
{
    if(mariostatus==1)
    ctx.drawImage(marior6,0,0);
    else
    ctx.drawImage(r6,0,0);
    
    ctx.font="25px Bold Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("MAIN DESIGN",335, 210);
    ctx.fillText("XYZXXY",365, 230);
    ctx.fillText("CONCEPT",335, 280);
    ctx.fillText("ABC ABC",365, 300);
    ctx.fillText("CHARACTERS",335, 350);
    ctx.fillText("PQRPQR",365, 370);
    ctx.font="35px Bold Arial";
    ctx.fillStyle = "darkblue";
    ctx.fillText("PRESS ENTER TO RESTART.........",175, 430);
    
}



//display game about screen


function abt()
{
    if(mariostatus==1)
    {
    var t=document.getElementById("marhelp");
    t.play();
    }
    else
    {
        var t=document.getElementById("main");
        t.play();   
    }
    
    if(mariostatus==1)
    ctx.drawImage(mn,0,0);
    
    document.getElementById("e").style.display="none";
    document.getElementById("m").style.display="none";
    document.getElementById("h").style.display="none";
    document.getElementById("E").style.display="none";
    document.getElementById("M").style.display="none";
    document.getElementById("H").style.display="none";
    document.getElementById("wc").style.display="none";
    document.getElementById("wec").style.display="none";
    document.getElementById("j").style.display="none";
    document.getElementById("about").style.display="none";
    document.getElementById("help").style.display="none";
    document.getElementById("d").style.display="none";
    document.getElementById("bk").style.display="block";
    
    
    
    ctx.font="45px Bold  Arial";
    
    if(mariostatus==1)
    ctx.fillStyle = "#FFFFFF";
    else
    ctx.fillStyle = "#000000";   
    
       

    ctx.fillText("BLOCK BREAKER DELUXE",165, 100);
    ctx.font="30px Bold Italic Arial";
    ctx.fillText("This game is basically fast-paced and interative meant",135, 220);
    ctx.fillText("purely for entertainment and challenge for players",135, 250);
    ctx.fillText("of all ages,with an user-friendly User Interface(UI) and ",135, 280);
    ctx.fillText("various scenarios to keep the user at the edge of the seat,",135, 310);
    ctx.fillText("with two different themes and various gimmicks available.",135, 340);
    ctx.fillText("So,let the fun times begin.",135, 370);
    ctx.font="40px Bold Italic Arial";
    ctx.fillStyle = "#008000";
    ctx.fillText("LET'S PLAY!!!",335, 520);

  console.log(mariostatus);  
}










//Map the coloured bricks/blocks 


function laybrick() {
    console.log(rows);
    for(var c=0; c<cols; c++) {
        for(var r=0; r<rows; r++) {
            if (bricks[c][r].status == 1 || bricks[c][r].status == 2|| bricks[c][r].status == 3|| bricks[c][r].status == 4 || bricks[c][r].status == 5|| bricks[c][r].status == 6|| bricks[c][r].status == 7) {
            var bx = (c*(bwd+padding))+offsetleft;
			var by = (r*(bht+padding))+offsettop;
			
			bricks[c][r].x = bx;
            bricks[c][r].y = by;
          
            //begin sketch
            ctx.beginPath();

            //white bricks or blue blocks
            if(bricks[c][r].status == 2 && round==2)
            {   
                if(mariostatus==1)
                ctx.drawImage(blueblock,bx,by);
                else
                ctx.drawImage(img4,bx-10,by+10);
            }
            else if(bricks[c][r].status == 2 && round==3)
            {
                if(mariostatus==1)
                ctx.drawImage(blueblock,bx,by);
                else
                ctx.drawImage(img4,bx-10,by+10);
            }
            else if(bricks[c][r].status == 2 && round==4)
            {
                if(mariostatus==1)
                ctx.drawImage(blueblock,bx,by);
                else
                ctx.drawImage(img4,bx-10,by+10);
            }
            else if(bricks[c][r].status == 2 && round==5)
            {
                if(mariostatus==1)
                ctx.drawImage(blueblock,bx,by);
                else
                ctx.drawImage(img4,bx-10,by+10);
            }
            //blank bricks
            else if(bricks[c][r].status == 3 && round==3)
            {
            console.log("empty");
            }
            else if(bricks[c][r].status == 3 && round==4)
            {
            console.log("empty");
            }
            else if(bricks[c][r].status == 3 && round==5)
            {
            console.log("empty");
            }
            
            
            //yellow bricks or yellow blocks
            else if(bricks[c][r].status == 4  && round==3)
            {   
                if(mariostatus==1)
                ctx.drawImage(yellowblock,bx,by);
                else
                ctx.drawImage(img6,bx,by+10);
            }
            else if(bricks[c][r].status == 4  && round==4)
            {
                if(mariostatus==1)
                ctx.drawImage(yellowblock,bx,by);
                else
                ctx.drawImage(img6,bx,by+10);
            }
            else if(bricks[c][r].status == 4  && round==5)
            {
                if(mariostatus==1)
                ctx.drawImage(yellowblock,bx,by);
                else
                ctx.drawImage(img6,bx,by+10);
            }
            
            
            //brown bricks or brownmushroom
            else if(bricks[c][r].status == 5 && round==4)
            {
                if(mariostatus==1)
                ctx.drawImage(mariomushroom1,bx-5,by+11);
                else    
                ctx.drawImage(img7,bx-5,by+11);    
            }
            else if(bricks[c][r].status == 5 && round==5)
            {
                if(mariostatus==1)
                ctx.drawImage(mariomushroom1,bx-5,by+11);
                else
                ctx.drawImage(img7,bx-5,by+11);    
            }
            
            
            //black bricks or blackmushroom
            else if(bricks[c][r].status == 6 && round==4)
            {
                if(mariostatus==1)
                ctx.drawImage(mariomushroom2,bx-5,by+5);
                else
                ctx.drawImage(img9,bx,by+8);    
            }
            else if(bricks[c][r].status == 6 && round==5)
            {
                if(mariostatus==1)
                ctx.drawImage(mariomushroom2,bx-5,by+5);
                else
                ctx.drawImage(img9,bx,by+8);    
            }
            
            
            //grey bricks or brown blocks
            else if(bricks[c][r].status == 7 && round==5)
            {
                if(mariostatus==1)
                ctx.drawImage(powerblock,bx,by);    
                else
                ctx.drawImage(img8,bx-3,by+3);    
            }
            else
            {
                if(mariostatus==1)
                ctx.drawImage(brownblock,bx,by);    
                else
                ctx.drawImage(img1,bx,by);
            }
            
            ctx.fill();
            ctx.closePath();
        }}
    }
}






//start the game and calculate the round


function nextnow(val)
{
    var req=sessionStorage.getItem("diff");
    var rd=sessionStorage.getItem("rd");
    var rd1=parseInt(rd);
    round=val+rd1;
    sessionStorage.setItem("rd",round);
    console.log(round);
    console.log(req);
    playnow(req);
        
    
}



//draw the ball on the canvas


function ballshape() {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI*2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}



//draw the paddle on the canvas



function paddleshape() {
    ctx.beginPath();
    ctx.drawImage(img2,px, canvas.height-49);
    
    ctx.fill();
    ctx.closePath();
}




//Each level difficulty and components get updated here 

function playnow(butid)
{



    if(butid=='e' ||butid=='E' )
    {
    if(butid=='E')
    {
        mariostatus=1;
        document.getElementById("E").style.display="none";
    document.getElementById("M").style.display="none";
    document.getElementById("H").style.display="none";    
    sessionStorage.setItem("diff", "E");    
}
    else
    {
        document.getElementById("e").style.display="none";
        document.getElementById("m").style.display="none";
        document.getElementById("h").style.display="none";   
        sessionStorage.setItem("diff", "e");
    }
    dx=4;
    dy=-4;
    rows=4;
    inc=7;    
    
    sessionStorage.setItem("speed", dx);
    rad=10;
    pwd = 120;
    px = (canvas.width-pwd)/2;    
    }
    else if(butid=='m' ||butid=='M' )
    {

        if(butid=='M')
        {
            mariostatus=1;
        document.getElementById("E").style.display="none";
        document.getElementById("M").style.display="none";
        document.getElementById("H").style.display="none";    
        sessionStorage.setItem("diff", "M");    
    }
        else
        {
            document.getElementById("e").style.display="none";
            document.getElementById("m").style.display="none";
            document.getElementById("h").style.display="none";   
            sessionStorage.setItem("diff", "m");
        }   
     dx=5;
     dy=-5;
     rows=3;
     inc=14;   
     
     sessionStorage.setItem("speed", dx);
     rad=10;
     pwd = 120;
     px = (canvas.width-pwd)/2;
    }
    else if(butid=='h' || butid=='H')
    {
        if(butid=='H')
        {
            mariostatus=1;
        document.getElementById("E").style.display="none";
        document.getElementById("M").style.display="none";
        document.getElementById("H").style.display="none";    
        sessionStorage.setItem("diff", "H");    
    }
        else
        {
            document.getElementById("e").style.display="none";
            document.getElementById("m").style.display="none";
            document.getElementById("h").style.display="none";
            sessionStorage.setItem("diff", "h");   
        }

        dx=6;
        dy=-6;
        rows=3;
    inc=19;
    
    sessionStorage.setItem("speed", dx);
    rad=10;    
    pwd = 120;
    px = (canvas.width-pwd)/2;    
    }
    else
    nextnow();




    console.log(butid);

    if(round==2)
    {
        
    for(var c=0; c<cols; c++) {
        bricks[c] = [];
        for(var r=0; r<rows; r++) {
            
            if(c%3==0)
            bricks[c][r] = { x: 0, y: 0 ,status: 2};
            else
            bricks[c][r] = { x: 0, y: 0 ,status: 1};
            
        }
    }
    blank=0;
    yellowbrick=0;
    }
    else if(round==3)
    {
      blank=0;
      yellowbrick=0;  
    for(var c=0; c<cols; c++) {
        bricks[c] = [];
        for(var r=0; r<rows; r++) {
            
            if(r==1 && c%2==0  || (r==3 && c%2==0))
            bricks[c][r] = { x: 0, y: 0 ,status: 2};
            else if(r==0 && c%2==0)
            {bricks[c][r] = { x: 0, y: 0 ,status: 3};
            ++blank;}
            else if((r==2 && c==1) || (r==2 && c==5) || (r==2 && c==7) || (r==2 && c==9) || (r==1 && c==3) || (r==3 && c%2==0))
            {bricks[c][r] = { x: 0, y: 0 ,status: 4};
            ++yellowbrick;}
            else
            bricks[c][r] = { x: 0, y: 0 ,status: 1};
            
        }
    }
    console.log("round 3:"+"yellow"+yellowbrick);
    console.log("round 3:"+"blank"+blank);  
    }
    
    else if(round==4)
    {
        
        yellowbrick=4;

    for(var c=0; c<cols; c++) {
        bricks[c] = [];
        for(var r=0; r<rows; r++) {
            
            if((r==0 && c==1) || (r==0 && c==9) || (r==2 && c==0) || (r==2 && c==2) || (r==2 && c==8) || (r==2 && c==10)|| (r==3 && c==0) || (r==3 && c==10))
            bricks[c][r] = { x: 0, y: 0 ,status: 2};
            else if((r==1 && c%2==0))
            {
            bricks[c][r] = { x: 0, y: 0 ,status: 3};
            ++blank;
            }
            else if((r==0 && c==0) || (r==0 && c==2) || (r==0 && c==8) || (r==0 && c==10))
            {
            bricks[c][r] = { x: 0, y: 0 ,status: 4};
            
            }
            else if((r==0 && c==3) || (r==0 && c==7) || (r==2 && c==3)|| (r==3 && c==6))
            bricks[c][r] = { x: 0, y: 0 ,status: 5};
            else if((r==1 && c==1) || (r==1 && c==9) || (r==2 && c==7)|| (r==3 && c==3)|| (r==3 && c==6))
            bricks[c][r] = { x: 0, y: 0 ,status: 6};
            else
            bricks[c][r] = { x: 0, y: 0 ,status: 1};
            
        }
    }}

    else if(round==5)
    {
        
        yellowbrick=6;
        
        if(butid=='e'|| butid=='E')
        blank=5;
        else if(butid=='m'|| butid=='M' || butid=='h'|| butid=='H')
        blank=3;

    for(var c=0; c<cols; c++) {
        bricks[c] = [];
        for(var r=0; r<rows; r++) {
            
            if((r==0 && c==1) || (r==0 && c==4) || (r==0 && c==8) || (r==1 && c==2) || (r==1 && c==6)|| (r==3 && c==2) || (r==3 && c==8))
            bricks[c][r] = { x: 0, y: 0 ,status: 7};
            else if((r==0 && c==3) || (r==0 && c==5) || (r==0 && c==7)|| (r==3 && c==3)|| (r==3 && c==7))
            {
            bricks[c][r] = { x: 0, y: 0 ,status: 3};
            
            }
            else if((r==1 && c==0) || (r==1 && c==3) || (r==1 && c==5) || (r==1 && c==8)|| (r==2 && c==3)|| (r==2 && c==7))
            {
            bricks[c][r] = { x: 0, y: 0 ,status: 4};
            }
            else if((r==0 && c==2) || (r==0 && c==6) || (r==1 && c==4)|| (r==3 && c==4)|| (r==3 && c==6))
            bricks[c][r] = { x: 0, y: 0 ,status: 5};
            else if((r==0 && c==0) || (r==0 && c==10)|| (r==1 && c==1)|| (r==1 && c==7))
            bricks[c][r] = { x: 0, y: 0 ,status: 6};
            else if((r==1 && c==10) || (r==2 && c==4)|| (r==2 && c==5)|| (r==2 && c==6)|| (r==3 && c==5))
            bricks[c][r] = { x: 0, y: 0 ,status: 2};
            else
            bricks[c][r] = { x: 0, y: 0 ,status: 1};
            
        }
    }}

    else
    {
    
    for(var c=0; c<cols; c++) {
        bricks[c] = [];
        for(var r=0; r<rows; r++) {
            
            bricks[c][r] = { x: 0, y: 0 ,status: 1};
            
        }
    }
    blank=0;
    yellowbrick=0;
    sessionStorage.setItem("rd", 1);
}
      
    
    document.getElementById("pus").style.display="block";
    document.getElementById("mus").style.display="block";
    document.getElementById("res").style.display="block";
    document.getElementById("wec").style.display="none";
    document.getElementById("j").style.display="none";
    document.getElementById("about").style.display="none";
    document.getElementById("help").style.display="none";
    document.getElementById("tes").style.display="none";
    document.getElementById("bk").style.display="none";
    setup(butid);
}





//if mario scenario is selected,update it accordingly.


function mariostat(val)
{

    mariostatus=1;

    document.getElementById("E").style.display="none";
    document.getElementById("M").style.display="none";
    document.getElementById("H").style.display="none";
    
    if(val==1)
    disphelp();
    else if(val==2)
    abt();
    else if(val==3)
    demo();
    else
    back();
}



//change the theme 

function tchange()
{
    window.location.replace("draw.html");      
}






//display help menu

function disphelp()
{
    
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("e").style.display="none";
    document.getElementById("m").style.display="none";
    document.getElementById("h").style.display="none";
    document.getElementById("about").style.display="none";
    document.getElementById("help").style.display="none";
    document.getElementById("wc").style.display="block";
    document.getElementById("wec").style.display="none";
    document.getElementById("j").style.display="block";
    document.getElementById("d").style.display="block";

    console.log(mariostatus);
    
}



//pause game

function pause()
{
    ctx.font="33px Bold Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("GAME PAUSED!!!...PRESS 'C' TO CONTINUE",50, 300);
    clearInterval(interval);
    
}




//display game rules in help menu

function rules()
{
 
    if(mariostatus==1)
    {
    var t=document.getElementById("marhelp");
    t.play();
    }
    else
    {
        var t=document.getElementById("main");
        t.play();   
    }


    document.getElementById("e").style.display="none";
    document.getElementById("m").style.display="none";
    document.getElementById("h").style.display="none";
    document.getElementById("wc").style.display="none";
    document.getElementById("wec").style.display="none";
    document.getElementById("j").style.display="none";
    document.getElementById("d").style.display="none";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "43px bold Arial";
    if(mariostatus==1)
    {
        ctx.fillStyle = "white";
        ctx.drawImage(mn,0,0); 
    }                       
    else
    ctx.fillStyle = "darkblue";                        
    ctx.fillText("INSTRUCTIONS",310, 50);

    
    
    if(mariostatus==1)
    ctx.font = "17px bold Arial";   
    else
    ctx.font = "23px bold Arial";

    if(mariostatus==1)
    {


    ctx.fillText("1.The object of the game is to break all the blocks.",80, 90);
    ctx.fillText("2.Each block can give a maximum of 1 point.",80, 110);
    ctx.fillText("3.If player loses all 3 lives,game is over.",80, 130);
    ctx.fillText("4.If a player clears all levels, a bonus of 100 points will be added to the final tally.",80, 150);
    }
    else
    {
        ctx.fillText("1.The object of the game is to break all the blocks.",80, 150);
        ctx.fillText("2.Each block can give a maximum of 1 point.",80, 180);
        ctx.fillText("3.If player loses all 3 lives,game is over.",80, 210);
        ctx.fillText("4.If a player clears all levels, a bonus of 100 points will be added to the final tally.",80, 240);    
    }
    if(mariostatus==1)
    ctx.fillText("5.Various blocks in the game:",80, 175);
    else
    ctx.fillText("5.Various bricks in the game:",80, 270);
    
    
    if(mariostatus==1)
    {
    ctx.drawImage(brownblock,90,185);
    ctx.fillStyle = "#FFFFFF";
    
    ctx.fillText("--BROWN BLOCKS are basic blocks.",170, 228);
    }
    else    
    {
    ctx.drawImage(img1,90,270);
    ctx.fillStyle = "#FFFFFF";
    
    ctx.fillText("--RED BRICKS are basic bricks.",170, 315);
    }
    
    if(mariostatus==1)
    {
    ctx.drawImage(blueblock,90,268);
    ctx.fillStyle = "#FFFFFF";
    
    ctx.fillText("--BLUE BLOCKS need to be hit twice(except with large ball)",170, 311);
    }
    else    
    {
    ctx.drawImage(img4,80,325);
    ctx.fillStyle = "#FFFFFF";
    
    ctx.fillText("--WHITE BRICKS need to be hit twice(except with large ball)",170, 360);
    }
    
    if(mariostatus==1)
    {
    ctx.drawImage(yellowblock,90,351);
    ctx.fillStyle = "#FFFFFF";
    
    ctx.fillText("--YELLOW BLOCKS are static.",170, 395);
    }
    else    
    {
    ctx.drawImage(img6,84,370);
    ctx.fillStyle = "#FFFFFF";
    
    ctx.fillText("--YELLOW BRICKS are static.",170, 405);
    }

    if(mariostatus==1)
    {
        
    ctx.drawImage(mariomushroom1,80,425);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("--BROWN MUSHROOM ball increases in size. ",170, 450);    
    }
    else
    {
        ctx.drawImage(img7,72,415);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("--BROWN BRICKS ball increases in size. ",170, 450);
    }
    
    if(mariostatus==1)
    {
    ctx.drawImage(mariomushroom2,87,460);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("--BLACK MUSHROOM ball speed increases. ",170, 500);
    }
    else
    {
    ctx.drawImage(img9,84,460);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("--BLACK BRICKS ball speed increases. ",170, 500);
    }
    
    if(mariostatus==1)
    {
        ctx.drawImage(powerblock,86,530);
        ctx.fillStyle = "#FFFFFF";
    ctx.fillText("--POWER BLOCKS paddle increases in size.",170, 560);
    }
    else
    {
        ctx.drawImage(img8,90,495);
        ctx.fillStyle = "#FFFFFF";
    ctx.fillText("--GREY BRICKS paddle increases in size.",170, 540);
    }
    
    
    document.getElementById("bk").style.display="block";
                            
}





//show demo in help menu

function demo()
{
    if(mariostatus==1)
    {
        ctx.drawImage(mn,0,0);
        document.getElementById("vid2").style.display="block";   
    }
    else
    {

    ctx.drawImage(img11,0,0);
    document.getElementById("vid1").style.display="block";
    }
    
    document.getElementById("j").style.display="none";
    document.getElementById("d").style.display="none";
    document.getElementById("bk").style.display="none";
    document.getElementById("bk1").style.display="block";
    document.getElementById("wc").style.display="none";  
}




//stop or start current playing music


function stopmusic(val)
{
    
    console.log(val);
    if(round==1)
    {

        if(document.getElementById("mus").innerText=="START MUSIC")
        {
            document.getElementById("mus").innerText=="STOP MUSIC";
            if (mariostatus==1)
        var t=document.getElementById("audiomario1");
        else
        var t=document.getElementById("audion");
        t.play();
        }
        else
        {
            if (mariostatus==1)
            var t=document.getElementById("audiomario1");
            else
            var t=document.getElementById("audion");
            t.pause();
         
        }
    
    }
    else if(round==2)
    {

        if(document.getElementById("mus").innerText=="START MUSIC")
        {
            document.getElementById("mus").innerText=="STOP MUSIC";
            if (mariostatus==1)
        var t=document.getElementById("audiomario2");
        else
        var t=document.getElementById("audio2");
        t.play();
        }
        else
        {
            if (mariostatus==1)
            var t=document.getElementById("audiomario2");
            else
            var t=document.getElementById("audio2");
            t.pause();
    
        }
    }
    else if(round==3)
    {
        

        if(document.getElementById("mus").innerText=="START MUSIC")
        {
            document.getElementById("mus").innerText=="STOP MUSIC";
            if (mariostatus==1)
        var t=document.getElementById("audiomario3");
        else
        var t=document.getElementById("audio3");
        t.play();
        }
        else
        {
            if (mariostatus==1)
        var t=document.getElementById("audiomario3");
        else
        var t=document.getElementById("audio3");
        t.pause();
        }
    }   
    else if(round==4)
    {
        
        if(document.getElementById("mus").innerText=="START MUSIC")
        {
            document.getElementById("mus").innerText=="STOP MUSIC";
            if (mariostatus==1)
        var t=document.getElementById("audiomario4");
        else
        var t=document.getElementById("audio4");
        t.play();
        }
        else
        {
            if (mariostatus==1)
        var t=document.getElementById("audiomario4");
        else    
        var t=document.getElementById("audio4");
        t.pause();

        }
    }
    else if(round==5)
    {
         
    
    if(document.getElementById("mus").innerText=="START MUSIC")
        {
            document.getElementById("mus").innerText=="STOP MUSIC";
            if (mariostatus==1)
        var t=document.getElementById("audiomario5");
        else
        var t=document.getElementById("audio5");
        t.play();
        }
        else
        {
            if (mariostatus==1)
    var t=document.getElementById("audiomario5");
    else
    var t=document.getElementById("audio5");
    t.pause();
        }
    }
    else
    {
        if(document.getElementById("mus").innerText=="START MUSIC")
        {
            document.getElementById("mus").innerText=="STOP MUSIC";
            var t=document.getElementById("main");
            t.play();
        }
        else
        {var t=document.getElementById("main");
        t.pause();
    }
        
    }

    if(val=="mus")
    {
        document.getElementById("mus").innerText="START MUSIC";
    
    }    

}




//load the game initially

function playgame(val)
{
    if(mariostatus==1)
    new Audio("music/Overworld.mp3").play();
    else
    {
        var t=document.getElementById("main");
            t.play();
    }
    

    var i=0;
    document.getElementById("bar").style.display="block" ;
    document.getElementById("st").style.opacity=0.3 ;
    document.getElementById("st1").style.opacity=0.3 ;
    document.getElementById("st").style.disabled=true ;
    document.getElementById("bar").style.disabled=true ;
    document.getElementById("dn").style.display="block" ;
    document.getElementById("dn").innerText="LOADING PLEASE WAIT.." ;
    document.getElementById("barcv").style.display="block" ;
    

    if (i==0) {
        i=1;
        var elem=document.getElementById("bar");
        var wd=1;
        var id=setInterval(frame,60);
    }
    
    function frame()
    {
        if (wd>=100) {
            clearInterval(id);
            i=0;
            if(val=="mt")
            {document.getElementById("e").style.display="block";
            document.getElementById("m").style.display="block";
            document.getElementById("h").style.display="block";
            document.getElementById("st").style.display="none";
            document.getElementById("myCanvas").style.display="block" ;
            document.getElementById("st1").style.display="none";
            document.getElementById("sidenav").style.display="block";
            document.getElementById("dn").style.display="none";
            document.getElementById("barcv").style.display="none";
            document.getElementById("bar").style.display="none";
            document.getElementById("wec").style.display="block";
            document.getElementById("nw").style.display="none";
            }
            if(val=="mr")
            {
                
                window.location.replace("mariotheme.html");
                
            }
            
        }
        else
        {
            wd++;
            elem.style.width=wd+"%";
            document.getElementById("bar").innerText=wd+"%";
        }
    }
    
}




//reset the game

function reset()
{

    window.location.replace("draw.html");
}



//go back to main menu

    
function back()    
{    
if(mariostatus==1)
    window.location.replace("mariotheme.html");
    
    else
    {

    
    ctx.drawImage(img5,0,0);
    document.getElementById("e").style.display="block";
    document.getElementById("m").style.display="block";
    document.getElementById("h").style.display="block";
    document.getElementById("wec").style.display="block";
    document.getElementById("help").style.display="block";
    document.getElementById("about").style.display="block";
    document.getElementById("vid1").style.display="none";
    document.getElementById("bk1").style.display="none";
    document.getElementById("bk").style.display="none";
    }


    
}



//main reinterative function to calculate movement of ball and apply various actions 


function setup(butid) {
	
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(round==2)
    {if(mariostatus==1)
        {
            ctx.drawImage(marior2,0,0);
            
            
            var t=document.getElementById("audiomario2");
            t.play();   
        }
        else
        {ctx.drawImage(r2,0,0);
            
        var t=document.getElementById("audio2");
        t.play();
        }
    }
    else if(round==3)
    {
        if(mariostatus==1)
        {
            ctx.drawImage(marior3,0,0);
            var t=document.getElementById("audiomario3");
            t.play();   
        }
        else
        {ctx.drawImage(r3,0,0);
        var t=document.getElementById("audio3");
        t.play();
        }
    }
    else if(round==4)
    {
        if(mariostatus==1)
        {
            ctx.drawImage(marior4,0,0);
            var t=document.getElementById("audiomario4");
            t.play();   
        }
        else
        {ctx.drawImage(r4,0,0);
        var t=document.getElementById("audio4");
        t.play();
        }
    }
    else if(round==5)
    {
        if(mariostatus==1)
        {
            ctx.drawImage(marior5,0,0);
            var t=document.getElementById("audiomario5");
            t.play();   
        }
        else
        {ctx.drawImage(r5,0,0);
        var t=document.getElementById("audio5");
        t.play();
        }
    }    
    else    
    {
        if(mariostatus==1)
        {
            ctx.drawImage(marior1,0,0);
            
            var t=document.getElementById("audiomario1");
            t.play();   
        }
        else
        {ctx.drawImage(r1,0,0);
        var g=document.getElementById("main");
        g.pause();

        var t=document.getElementById("audion");
        t.play();
        }
    }



if(rad==15)
{
    if(remb>0)
    remb--;
    else
    rad=10;
}

if(pwd==180)
{
    if(remw>0)
    remw--;
    else
    pwd=120;
}

if(dx==8)
{
    var req=sessionStorage.getItem("diff");

    if(rems>0)
    rems--;
    else
    {

        if(req=='e' || req=='E')
    {
        dx=4;
        dy=-4;
    }
    else if(req=='m' || req=='M')
    {
    
    
        dx=5;
        dy=-5;
    }
    else if(req=='m' || req=='M')
    {
    
    
        dx=6;
        dy=-6;
    }
    }
    
}




    laybrick();
	ballshape();
	paddleshape();
    tscore();
    hittarget();
    livesshow();   
    
	if(x + dx > canvas.width-10 || x + dx < 10) {
        dx = -dx;
    }
    if(y + dy < 10) {
        dy = -dy;
	}
	else if(y + dy > canvas.height-30) {
        if(x > px && x < px + pwd) {
            dy = -dy;
        }
        else {
            lives--;
            
            if(mariostatus==1)
            new Audio("music/mariolostlife.wav").play();
            else
            new Audio("music/Wronganswer.mp3").play();

            if(!lives) {
                
                if(mariostatus==1)    
                new Audio("music/mariogameover.wav").play();
                else
                new Audio("music/gamelose.mp3").play();
                
                alert("GAME OVER");
                document.location.replace("draw.html");

              }
              else {
                x = canvas.width/2;
                y = canvas.height-30;
                
                if(butid=="e")
                {
                dx=3;
                dy=-3;    
                }
                else if(butid=="m")
                {
                dx=5;
                dy=-5;   
                }
                else if(butid=="h")
                {
                dx=7;
                dy=-7;

                }


                px = (canvas.width-pwd)/2;
              } 
            }
    }




	if(rightside) {
        px += inc;
        if (px > canvas.width-pwd){
            px = canvas.width-pwd-24;
            
        }
        if(mariostatus==1)
        new Audio("music/blackmushmario.wav").play();
        else
        new Audio("music/swoosh.mp3").play();

    }
    else if(leftside) {
        px -= inc;
        if (px<0){
            px =-24;
        }
        if(mariostatus==1)
        new Audio("music/blackmushmario.wav").play();
        else
        new Audio("music/swoosh.mp3").play();
    }



    x += dx;
    y += dy;
    requestAnimationFrame(setup);   //apply animations iteratively
}


