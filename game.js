
var coord={ex:0,px:0}

var player;

window.onload=()=>{
player = document.getElementById("player");
player.health=200;
player.ad=20;
player.score=0;
document.addEventListener("click",(e)=>{
    player.style.left=0+"px";
    player.style.top=0+"px";
    let offX=e.offsetX;
    let offY=e.offsetY;
    coord["px"]=e.offsetX;
    player.style.left=offX+"px";
    player.style.top=offY+"px";
    if(!aliveEnemy)Spawn();
})
}




var enemy;
var redX;
let aliveEnemy=false;
function Spawn(){
aliveEnemy=true;
enemy = document.getElementById("enemy")
enemy.getElementsByTagName('img')[0].hidden=false;
enemy.style.opacity=1;
enemy.style.transition="all 1.5s linear";
enemy.health=100;
healthbarEnemy.value=100;
enemy.getElementsByTagName("progress")[0].hidden=false;

redX = setInterval(() => {
let rnx = Math.random()*window.innerWidth;
enemy.style.left=Math.floor(rnx)+"px";
enemy.style.top=Math.floor(Math.random()*window.innerHeight)+"px";
coord["ex"]=Math.ceil(rnx);
if(enemy.health<=0){
    enemy.style.transition="all 0s linear";
    enemy.style.opacity=0;  
    enemy.hidden=true;
    player.score++;
    info.textContent=`Score : ${player.score}, Health : ${player.health}`
    enemy.style.left=Math.floor(Math.random()*window.innerWidth)+"px";
    enemy.style.top=Math.floor(Math.random()*window.innerHeight)+"px";
    aliveEnemy=false;
    clearInterval(redX)
}

}, 1000);


}




document.onkeypress = (e) => {
    if(e.code=="Space"){
        if(Math.abs(coord["ex"]-coord["px"])<120){
        enemy.health-=player.ad;
        healthbarEnemy.value-=player.ad;
        info.textContent=`Score : ${player.score}, Health : ${player.health}`
        }
    }
}



setInterval(()=>{
    if(player.health<=0){
    
        location.reload();
        alert("You lost :(")

    }
    if(Math.abs(coord["ex"]-coord["px"])<120 && aliveEnemy){
        player.health-=10;
        healthbarPlayer.value-=10;
        info.textContent=`Score : ${player.score}, Health : ${player.health}`
    } 
},500)



