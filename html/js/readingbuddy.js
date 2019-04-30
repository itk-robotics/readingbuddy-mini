/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

// keeping a pointer to the session is very useful!
var session;
var time = 0;


// Create question btns

var questionsA = ['questionA1','questionA2'];
var questionsB = ['questionB1','questionB2','questionB3'];
var questionsC = ['questionC1','questionC2','questionC3'];

var answerA = null
var answerB = null
var answerC = null

function resetVariables(){
    answerA = null
    answerB = null
    answerC = null
}


try {
  QiSession( function (s) {
    console.log('QiSession connected!');
    session = s;
    // now that we are connected, we can use the buttons on the page
    animatedSay('\\pau=1000\\ \\rspd=80\\ hvor længe skal vi læse?')
    playAnimation('animations/Stand/Gestures/ShowTablet_1');
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
function playAnimation(animation) {
    session.service('ALAnimationPlayer').then(function (aniplay) {
    aniplay.run(animation);

   }, function (error) {
    console.log(error);
   })
}

function animatedSay(text) {
    session.service('ALAnimatedSpeech').then(function (tts) {
    tts.say(text);

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

/*
//TODO DELETE ?
var readTime = [3,7,10]; // repeated 3 times. Thus duration == ~10, 20 ,30 minutes.

for (var i = 0; i < readTime.length; i++) {

    var buttonTime = readTime[i];
    console.log("Time options = " + buttonTime)
    document.getElementById('readTime' + buttonTime).addEventListener('click', function(){
        pageTimeChoice(readTime[i]); // Divide by 5 to speed up test!

    });
}
*/

document.getElementById('readTime3' ).addEventListener('click', function() {
    pageTimeChoice(3);
});

document.getElementById('readTime7' ).addEventListener('click', function() {
    pageTimeChoice(7);
});
document.getElementById('readTime10' ).addEventListener('click', function() {
    pageTimeChoice(10);
});

document.getElementById('startOver').addEventListener('click', function () {
    hideShow('pageFinished', 'pageTimeChoice');
});

// Choices section

function pageTimeChoice(buttonTime) {

    resetVariables();

    time = buttonTime; // set global to user selection
    console.log("you chose time = " + time + ", or " + buttonTime);
    animatedSay('\\rspd=80\\ Jeg glæder mig til at høre historien. Jeg lytter godt efter. Undervejs vil jeg stille dig nogle spørgsmål. Nu kan du begynde')
    hideShow('pageTimeChoice', 'pageTimer');
    setTimeout(function () {
        pageTimer(time);},
        10000);
    //pageTimer(time);

};


// Countdown section
function pageTimer(time) {
    console.log("ready to time");
    //countdown( 'ten-countdown', time, 0 ); //TODO enable
    countdown( 'ten-countdown', time, 0 ); //TODO enable
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
        if (  msLeft < 1000 ) {
            playAnimation("animations/Stand/Emotions/Positive/Excited_3");
            getQuestions(); //show A, B or C questions. IF all have been answered, then it shows final page.
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

function getQuestions() {

    if (answerA == null) {
        hideShow('pageTimer', 'pageQuestionA');
        for (var i = 0; i < questionsA.length; i++) {
            var btnQuestionA = questionsA[i];
            document.getElementById(btnQuestionA).addEventListener('click', function () {
                hideShow('pageQuestionA', 'pageTimer');
                answerA = document.getElementById(btnQuestionA).innerText;
                playAnimation("animations/Stand/Gestures/CountOne_1");
                pageTimer(time)
            });
        }
    } else if (answerB == null) {
        hideShow('pageTimer', 'pageQuestionB');
        for (var i = 0; i < questionsB.length; i++) {
            var btnQuestionB = questionsB[i];
            document.getElementById(btnQuestionB).addEventListener('click', function () {
                hideShow('pageQuestionB', 'pageTimer');
                playAnimation("animations/Stand/Gestures/CountOne_1");
                answerB = document.getElementById(btnQuestionB).innerText;
                pageTimer(time)
            });
        }
    } else {
        hideShow('pageTimer', 'pageQuestionC');
        for (var i = 0; i < questionsC.length; i++) {
            var btnQuestionC = questionsC[i];
            document.getElementById(btnQuestionC).addEventListener('click', function () {
                answerC = document.getElementById(btnQuestionC).innerText;
                console.log("choices: " + answerA+ " , "+ answerB +" , "+  answerC);
                saySummary();
                hideShow('pageQuestionC', 'pageFinished');
            });
        }

    }
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

function saySummary() {
    // some logic for what is said
    animatedSay("\\rspd=80\\ Tusind tak for historien. Jeg nød at høre om " + answerC + "\\pau=80\\ " + answerA + "\\pau=80\\ " + answerB)

}

/***/ })
/******/ ]);