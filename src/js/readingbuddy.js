// keeping a pointer to the session is very useful!
var session;

try {
  QiSession( function (s) {
    console.log('QiSession connected!');
    session = s;
    // now that we are connected, we can use the buttons on the page
    sayReadDuration();
  });
} catch (err) {
  console.log("Error when initializing QiSession: " + err.message);
  console.log("Make sure you load this page from the robots server.")
}
/*
$(document).ready( function(){
  sayReadDuration();
});​
*/


function sayReadDuration() {
  session.service('ALAnimatedSpeech').then(function (tts) {
    tts.say('\\pau=1000\\ \\rspd=80\\ hvor længe skal vi læse?');

  }, function (error) {
    console.log(error);
  })

  session.service('ALAnimationPlayer').then(function (aniplay) {
    aniplay.run('animations/Stand/Gestures/ShowTablet_1');

   }, function (error) {
    console.log(error);
   })
}
function sayBeforeListening() {
  session.service('ALAnimatedSpeech').then(function (tts) {
    tts.say('\\rspd=80\\ Jeg glæder mig til at høre historien. Jeg lydtter godt efter. Undervejs vil jeg stille dig nogle spørgsmål. \\pau=2000\\');

  }, function (error) {
    console.log(error);
  })
}

function raiseMemoryEventTest() {
  session.service('ALMemory').then(function (memory) {
    memory.raiseEvent('tabletButtonPress', 'random payload');
  }, function (error) {
    console.log(error);
  })
}

// *** HERE BE INDEX.JS ***
//require('jquery');
//import readingbuddy from './js/readingbuddy.js'

// Create readtime btns

var readTime = [10,20,30];

for (var i = 0; i < readTime.length; i++) {
    var time = readTime[i];
    document.getElementById('readTime' + time).addEventListener('click', function(){
        pageChoice(time/50); // Divide by 5 to speed up test!
    });
}

// Choices section

function pageChoice(time) {
    sayBeforeListening(); // TODO make blocking
    hideShow('pageChoice', 'pageTimer');
    pageTimer(time);
};


// Countdown section

function pageTimer(time) {
    countdown( 'ten-countdown', time, 0 );
};

// Timer functions

function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? '0' + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            hideShow('pageTimer', 'pageQuestion');
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

// Create question btns

var questions = ['Hest','Sko','Trappe'];

for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    document.getElementById('question' + question).addEventListener('click', function(){
        pageQuestion();
    });
}

// Question section

function pageQuestion() {
    hideShow('pageQuestion', 'pageChoice');
}

// Hide/show sections

function hideShow (hide, show) {
    // hide
    var h = document.getElementById(hide);
    h.classList.toggle('d-none');

    // Show
    var s = document.getElementById(show);
    s.classList.toggle('d-none');
}