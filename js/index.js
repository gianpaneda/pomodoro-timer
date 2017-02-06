function pomodoroTimer() {

  var countdownId;

  var timerDisplay = document.getElementById('workTimer');
  var breakDisplay = document.getElementById('breakTimer');

  var count = 1500; //1500 = 25 minutes
  var countStored = [];
  var countMinutes = count / 60;
  var countSeconds = count % 60;
  var countTime = countMinutes + ':' + countSeconds;
  timerDisplay.innerHTML = countTime + '0';

  document.getElementById('reset').disabled = true;
  document.getElementById('pause').disabled = true;

  var breakCountdownId;

  var breakCount = 300;
  var breakCountStored = [];
  var breakMinutes = breakCount / 60;
  var breakSeconds = breakCount % 60;
  var breakTime = breakMinutes + ':' + breakSeconds;
  breakDisplay.innerHTML = breakTime + '0';

  var alarm = new Audio('http://reneroth.org/projects/codepen/pomodoro_ring.mp3');
  
  function startTimer() {
    document.body.style.backgroundColor = '#5EE5D3';
    countdownId = setInterval(timer, 1000); //1000
    countStored = [];
    countStored.push(count);
    breakCountStored.push(breakCount);
    document.getElementById('reset').disabled = false;
    document.getElementById('pause').disabled = false;
    document.getElementById('start').disabled = true;
  }

  function timer() {
    count -= 1;
    countMinutes = Math.floor(count / 60);
    countSeconds = count % 60;
    workTimerFormatting();

    //when count ends
    if (count === 0) {
      clearInterval(countdownId);
      recordPomo();
      alarm.play();
      invertColors();
      startBreakCountdown();
    }
  }

  function pauseTimer() {
    count = count;
    clearInterval(countdownId);
    clearInterval(breakCountdownId);
    document.getElementById('start').disabled = false;
  }

  function resetTimer() {
    count = countStored[0];
    breakCount = breakCountStored[0];
    clearInterval(countdownId);
    clearInterval(breakCountdownId);
    countMinutes = Math.floor(count / 60);
    countSeconds = count % 60;
    breakMinutes = Math.floor(breakCount / 60);
    breakSeconds = breakCount % 60;
    workTimerFormatting();
    breakTimerFormatting();
    revertColors();
    document.getElementById('start').disabled = false;
  } 

  function increaseWorkTime() {
    count += 300;
    countMinutes = Math.floor(count / 60);
    countSeconds = Math.floor(count % 60);
    checkWork();
    workTimerFormatting();
  }

  function decreaseWorkTime() {
    count -= 300;
    countMinutes = Math.floor(count / 60);
    countSeconds = Math.floor(count % 60);
    checkWork();
    workTimerFormatting();
  }

  function startBreakCountdown() {
    breakCountdownId = setInterval(breakTimer, 1000); //1000
    var breakCountStored = [];
    console.log('initiate break')
  }

  function breakTimer() {
    breakCount -= 1;
    breakMinutes = Math.floor(breakCount / 60);
    breakSeconds = breakCount % 60;
    breakTimerFormatting();

    //when break ends ends
    if (breakCount === 0) {
      clearInterval(breakCountdownId);
      revertColors();
      alarm.play();
    }
  }

  function increaseBreakTime() {
    breakCount += 60;
    breakCountStored.push(breakCount);
    var breakCountUpdated = breakCountStored[breakCountStored.length - 1];
    console.log(breakCountUpdated);
    breakMinutes = Math.floor(breakCountUpdated / 60);
    breakSeconds = breakCountUpdated % 60;
    checkBreak();
    breakTimerFormatting();
  }

  function decreaseBreakTime() {
    breakCount -= 60;
    breakCountStored.push(breakCount)
    var breakCountUpdated = breakCountStored[breakCountStored.length - 1];
    console.log(breakCountUpdated);
    breakMinutes = Math.floor(breakCountUpdated / 60);
    breakSeconds = breakCountUpdated % 60;
    checkBreak();
    breakTimerFormatting();
  }

  function checkWork() {
    if (count > 600) {
      document.getElementById('decreaseWorkTime').disabled = false;
    } else {
      document.getElementById('decreaseWorkTime').disabled = true;
    }
  }

  function checkBreak() {
    if (breakCount >= 60) {
      document.getElementById('decreaseBreakTime').disabled = false;
    } else {
      document.getElementById('decreaseBreakTime').disabled = true;
    }
  }

  function workTimerFormatting() {
    if (countSeconds < 10) {
      countSeconds = '0' + countSeconds;
    }
    timerDisplay.innerHTML = countMinutes + ':' + countSeconds;
  }

  function breakTimerFormatting() {
    if (breakSeconds < 10) {
      breakSeconds = '0' + breakSeconds;
    }
    breakDisplay.innerHTML = breakMinutes + ':' + breakSeconds;
  }

  function invertColors() {
    document.body.style.backgroundColor = '#8F91FF';
    var pTag = document.getElementsByTagName('p');
    for (i = 0; i < pTag.length; i++) {
      document.getElementsByTagName('p')[i].style.color = '#E8E8E8';
      document.getElementsByTagName('i')[i].style.color = '#E8E8E8';
    }
  }

  function revertColors() {
    document.body.style.backgroundColor = '#5EE5D3';
    var pTag = document.getElementsByTagName('p');
    for (i = 0; i < pTag.length; i++) {
      document.getElementsByTagName('p')[i].style.color = 'black';
      document.getElementsByTagName('i')[i].style.color = 'black';
    }
  }
  
  function recordPomo() {
    var pomoIcon = document.createElement('i');
    pomoIcon.className = 'fa fa-check fa-2x';
    document.getElementById('pomosCompleted').appendChild(pomoIcon);
  }
  
  document.getElementById('increaseWorkTime').onclick = increaseWorkTime;
  document.getElementById('decreaseWorkTime').onclick = decreaseWorkTime;
  document.getElementById('increaseBreakTime').onclick = increaseBreakTime;
  document.getElementById('decreaseBreakTime').onclick = decreaseBreakTime;

  document.getElementById('start').onclick = startTimer;
  document.getElementById('pause').onclick = pauseTimer;
  document.getElementById('reset').onclick = resetTimer;
}

pomodoroTimer();