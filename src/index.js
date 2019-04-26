require('jquery');
//import readingbuddy from './js/readingbuddy.js'

// Create readtime btns

var readTime = [1,20,30];

for (let i = 0; i < readTime.length; i++) {
    const time = readTime[i];
    document.getElementById('readTime' + time).addEventListener('click', function(){
        pageChoice(time/5); // Divide by 5 to speed up test
    });
}

// Choices section

function pageChoice(time) {
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

for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
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
    const h = document.getElementById(hide);
    h.classList.toggle('d-none');

    // Show
    const s = document.getElementById(show);
    s.classList.toggle('d-none');
}