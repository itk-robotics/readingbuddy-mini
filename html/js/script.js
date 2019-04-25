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
} catch (err) {
  console.log("Error when initializing QiSession: " + err.message);
  console.log("Make sure you load this page from the robots server.")
}

$(function () {
  $('#10min').click(start_timer_10min);
});

$(function () {
  $('#event_test').click(raiseMemoryEventTest);
});

function toggle_timer(data) {
  subscriber.signal.disconnect(id_head_touch)
  $('h1').text('Time is counting down! ' + data )
}

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