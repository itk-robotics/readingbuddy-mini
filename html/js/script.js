// keeping a pointer to the session is very useful!
var session;
var id_head_touch;

try {
  QiSession( function (s) {
    console.log('connected!');
    session = s;
    // now that we are connected, we can use the buttons on the page
    $('button').prop('disabled', false);
    s.service('ALMemory').then(function (memory) {
      memory.subscriber('MiddleTactilTouched').then(function (subscriber) {
        id_head_touch = subscriber.signal.connect(toggle_timer);
      });
    });
  });
} catch (err) {qi
  console.log("Error when initializing QiSession: " + err.message);
  console.log("Make sure you load this page from the robots server.")
}

// BUTTONS
$(function () {
  $('#10min').click(start_timer_10min);
});

$(function () {
  $('#toggle_timer_button').click(toggle_timer);
});

// MEMORY EVENTS
$(function () {
  $('#event_test').click(raiseMemoryEventTest);
});

//FUNCTIONS

function start_timer_10min() {
  session.service('ALTextToSpeech').then(function (tts) {
    tts.say('jeg glæder mig til at høre historien. Jeg lytter godt efter. Undervejs vi ljeg stille dig nogle spørgsmål.');

    session.service('ALAnimationPlayer').then(function (apl) {
      apl.run("animations/Stand/Waiting/ScratchHead_1");
    })
    tts.say('tryk på mit hoved når du er klar');
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

var seconds = 60
function toggle_timer() {
 var countdown = setInterval(function() {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
}, 1000);
}

// *** test ***
// http://doc.aldebaran.com/2-5/dev/js/index-1.0.html#js-1-0-migrate

var signalLink;
var serviceDirectory;

function onServiceAdded(serviceId, serviceName)
{
  console.log("New service", serviceId, serviceName);
  serviceDirectory.serviceAdded.disconnect(signalLink);
}

session.service("ServiceDirectory").done(function (sd) {
  serviceDirectory = sd;
  serviceDirectory.serviceAdded.connect(onServiceAdded).done(function (link) {
    signalLink = link;
  }).fail(function (error) {
    console.log("An error occurred: " + error);
  });
});