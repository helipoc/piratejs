
var player;

window.onload=()=>{
player = document.getElementById("player");
player.health=200;
player.ad=10;
player.score=0;
document.addEventListener("click",(e)=>{
    player.style.left=0+"px";
    player.style.top=0+"px";
    let offX=e.offsetX;
    let offY=e.offsetY;
    player.style.left=offX+"px";
    player.style.top=offY+"px";
    if(!aliveEnemy)Spawn();
})
}




var enemy; // enemy
var redX; // interval each 1s pick a new random position for the enemy and delete the interval when the specific enemy dies
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
let rny = Math.random()*window.innerHeight;
enemy.style.left=Math.floor(rnx)+"px";
enemy.style.top=Math.floor(rny)+"px";
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



//listen on "space" click event to fire !
document.onkeypress = (e) => {
    if(e.code=="Space"){
        if(Math.abs(enemyTarget.getBoundingClientRect().x-playerTarget.getBoundingClientRect().x)<120){
            playerFire.hidden=false;
            playerFire.style.transition="all .5s linear";
            info.textContent=`Score : ${player.score}, Health : ${player.health}`
            enemy.health-=player.ad;
            healthbarEnemy.value-=player.ad;
        if(enemyTarget.getBoundingClientRect().y>playerTarget.getBoundingClientRect().y){
            playerFire.style.top="1000px";
        }else {
            playerFire.style.top="-1000px";
        }
      
        
        setTimeout(()=>{
            playerFire.hidden=true;
            playerFire.style.transition="all 0s linear";
            playerFire.style.left=0;
            playerFire.style.top=0;
        },800)
        }
        
    }
   
}





//interval for enemy fire each 0.5sec if enemy and player are in the same X level
setInterval(()=>{
    if(player.health<=0){
    
        location.reload();
        alert("You lost :(")

    }
    if(Math.abs(enemyTarget.getBoundingClientRect().x-playerTarget.getBoundingClientRect().x)<80 && aliveEnemy){
        player.health-=10;
        healthbarPlayer.value-=10;
        enemyFire.hidden=false;
        enemyFire.style.transition="all .5s linear";
        info.textContent=`Score : ${player.score}, Health : ${player.health}`
        if(enemyTarget.getBoundingClientRect().y<playerTarget.getBoundingClientRect().y){
            enemyFire.style.top="1000px";
            
        }
        else {
            enemyFire.style.top="-1000px";
        }  
        setTimeout(()=>{
            enemyFire.style.transition="all 0s linear";
            enemyFire.style.left=0;
            enemyFire.style.top=0;
            enemyFire.hidden=true;
        },800)

        
    } 
},500)



