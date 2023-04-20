
var duration = 48;
var hours = document.querySelector('.hour');
var minute = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');



var currentHours = 0;
var currentMinute = 0;
var currentSecond = 0;

function getTimeAll()
{
    var currentTime = new Date();
     currentHours = String(currentTime.getHours()).padStart(2,'0');
     currentMinute = String(currentTime.getMinutes()).padStart(2,'0');
     currentSecond = String(currentTime.getSeconds()).padStart(2,'0'); 
     hours.innerHTML = ` ${currentHours}<span>:</span>`;
    minute.innerHTML = ` ${currentMinute}<span>:</span>`;
    seconds.innerHTML = ` ${currentSecond}`;

};

var setTime = setInterval(getTimeAll, 1000);


//Xu ly Form
document.getElementById('form').addEventListener('submit',function(event)
{
    event.preventDefault(); // Ngăn chặn hành vi submit form mặc định

    var minutes = document.getElementById('enter-minutes').value; // Get value of Minutes countdown
    let secondsInput = parseInt(minutes)*60; // Parse to seconds

    var valueSelected = document.getElementById('selectTypes').value;
    const pattern=/^[1-9]\d*$/;

   //  console.log(pattern.test(minutes));

    if(valueSelected === "default" && minutes === ''){
       alert('Please chose one option to start');
       document.getElementById('enter-minutes').value = "";
       return;
    }
    else if(!pattern.test(minutes) && valueSelected === "default")
    {
      confirm('Please enter a positive number');
      document.getElementById('enter-minutes').value = "";
      return; 
    }else if(pattern.test(minutes) && valueSelected === "default")
    {

    }
    else 
    {
      secondsInput = Number(valueSelected);
    }
   


    var countDownText = document.getElementById('timeCountDown'); 

    // Reset value input
    document.getElementById('enter-minutes').value = "";
    
    //Animation
    document.getElementById('form').classList.add('active');
    document.querySelector('.display').classList.add('active');
    document.querySelector('.display').classList.remove('fadeOut');
    
    // COUNTDOWN TIME 
    var btn_Cancel = document.getElementById('btn-countdown-cancel');
    var audioAlarm = document.getElementById('myAudio');

    let countDownInterval  = setInterval(function()
    {
      countDown(secondsInput);
    }  ,1000);;

     


    function countDown(se){
      if(se < 0)
      {
       clearInterval(countDownInterval);
       audioAlarm.play();

       document.querySelector('.alarm-icon').classList.add('active');

       setTimeout(function(){
          audioAlarm.pause();
       }, duration * 1000);
      }
      else{
       const hoursC = Math.floor(se/3600);
       const minutesC = Math.floor(Number(se/60) - hoursC*60);
       const secondC = se % 60;

       countDownText.innerHTML = `
       Counting  <span>${String(hoursC).padStart(2,'0')} : ${String(minutesC).padStart(2,'0')} : ${String(secondC).padStart(2,'0')} </span>
       `
       secondsInput = secondsInput - 1;
      }
   }

     btn_Cancel.addEventListener('click',
     function(){
        clearInterval(countDownInterval);
        audioAlarm.pause();
        document.querySelector('.alarm-icon').classList.remove('active');
        document.getElementById('form').classList.remove('active');     
        document.querySelector('.display').classList.remove('active');
        document.querySelector('.display').classList.add('fadeOut');
     });
});





