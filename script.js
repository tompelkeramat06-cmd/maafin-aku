const $=id=>document.getElementById(id);
const targetTime=new Date("2026-10-08T13:30:00+07:00").getTime();
let noClicks=0, heartClicks=0;

const noMessages=[
  "Eits! Salah tombol 😭",
  "Aku tahu kamu masih kesel... 🥺",
  "Kasih aku kesempatan dong 💗",
  "Tombol ini sedang mogok karena terlalu sedih 😭",
  "Kayaknya hati kecilmu bilang maafin aku 💗",
  "Jangan pencet ini terus dong 😭"
];

function showStep(n){
  document.querySelectorAll(".card").forEach(c=>c.classList.add("hidden"));
  $("step"+n).classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
}
function confetti(count=45){
  const icons=["💗","💕","💖","✨","🎉","🌸"];
  for(let i=0;i<count;i++){
    const el=document.createElement("div");
    el.className="confetti";el.textContent=icons[Math.floor(Math.random()*icons.length)];
    el.style.left=Math.random()*100+"vw";
    el.style.animationDelay=Math.random()*.7+"s";
    el.style.fontSize=(1+Math.random()*1.2)+"rem";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),3200);
  }
}
function hearts(){
  const el=document.createElement("span");el.className="bg-heart";
  el.textContent=["💗","💕","💖","❤️","💘"][Math.floor(Math.random()*5)];
  el.style.left=Math.random()*100+"vw";
  el.style.fontSize=(.8+Math.random()*1.5)+"rem";
  el.style.animationDuration=(4+Math.random()*5)+"s";
  document.body.appendChild(el);setTimeout(()=>el.remove(),10000);
}
setInterval(hearts,650);

$("yesBtn").onclick=()=>{localStorage.setItem("forgiven","yes");showStep(2);confetti(55)};
$("noBtn").onclick=()=>{
  noClicks++;
  $("noMessage").textContent=noMessages[(noClicks-1)%noMessages.length];
  const b=$("noBtn");
  if(window.innerWidth>600){
    b.style.transform=`translate(${(Math.random()*100)-50}px,${(Math.random()*70)-35}px)`;
  }else{
    b.textContent=noClicks>=3?"🥺 Coba yang IYA deh":"😤 NGGAK";
  }
  if(noClicks>=5)$("noMessage").textContent="Oke deh... aku tunggu sampai kamu siap memaafkan aku 🥺💗";
};
$("surpriseBtn").onclick=()=>{showStep(3);localStorage.setItem("surprise","yes");updateCountdown()};
$("readyBtn").onclick=()=>{confetti(70);showStep(4);localStorage.setItem("agendaReady","yes")};

function updateCountdown(){
  const diff=targetTime-Date.now();
  if(diff<=0){
    ["days","hours","minutes","seconds"].forEach(id=>$(id).textContent="00");
    $("countdownStatus").textContent="🎉 WAKTUNYA TIBA!!! 🎉";
    $("countdown").innerHTML='<div style="grid-column:1/-1;padding:18px;font-weight:800;font-size:1.2rem;color:#e45592">AKHIRNYA KITA MAIN BARENG! 🥹💗</div>';
    return true;
  }
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff%86400000/3600000);
  const m=Math.floor(diff%3600000/60000);
  const s=Math.floor(diff%60000/1000);
  $("days").textContent=String(d).padStart(2,"0");
  $("hours").textContent=String(h).padStart(2,"0");
  $("minutes").textContent=String(m).padStart(2,"0");
  $("seconds").textContent=String(s).padStart(2,"0");
  $("countdownStatus").textContent=d===0?"💗 HARI INI KITA MAIN!": "Waktunya semakin dekat... 🥺";
  return false;
}
setInterval(()=>{if(updateCountdown()){}},1000);
updateCountdown();

$("themeBtn").onclick=()=>{
  document.body.classList.toggle("dark");
  $("themeBtn").textContent=document.body.classList.contains("dark")?"☀️":"🌙";
  localStorage.setItem("dark",document.body.classList.contains("dark"));
};
if(localStorage.getItem("dark")==="true"){document.body.classList.add("dark");$("themeBtn").textContent="☀️"}

let musicOn=false;
$("musicBtn").onclick=()=>{
  const audio=$("bgMusic");
  if(!musicOn){
    if(audio.src) audio.play().catch(()=>{});
    musicOn=true;$("musicBtn").textContent="🔊 Musik";
  }else{
    audio.pause();musicOn=false;$("musicBtn").textContent="🔇 Musik";
  }
};
document.addEventListener("click",e=>{
  if(e.target.closest(".emoji-big,.love-character,.gift")){
    heartClicks++;
    if(heartClicks>=5){$("secret").classList.remove("hidden");setTimeout(()=>$("secret").classList.add("hidden"),5000);heartClicks=0}
  }
});
$("resetBtn").onclick=()=>{
  localStorage.removeItem("forgiven");localStorage.removeItem("surprise");localStorage.removeItem("agendaReady");
  noClicks=0;showStep(1);$("noMessage").textContent="";
  $("noBtn").style.transform="";$("noBtn").textContent="😤 NGGAK";
};
