#!/usr/bin/env python
# coding=utf-8

import sys
import os
import qi

import codecs
sys.stdout = codecs.getwriter('utf8')(sys.stdout) #prevent print to console from crashing on special characters
sys.stderr = codecs.getwriter('utf8')(sys.stderr)

from time import time, sleep
import datetime

class PythonReadingBuddy(object):

    def __init__(self, application):
        self.application = application
        self.session = application.session
        self.service_name = self.__class__.__name__

        #logs are saved on robot: /var/log/naoqi/servicemanager/{application id}.{service name}
        self.logger = qi.Logger(self.service_name)

        self.logger.info("Initializing...")
        self.motion = self.session.service("ALMotion")
        self.posture = self.session.service("ALRobotPosture")
        #self.mail = choregrapheMail()
        #self.systemMail = self.mail
        self.audio = self.session.service("ALAudioPlayer")

        self.animatedSpeech = self.session.service("ALAnimatedSpeech")
        self.animationPlayer = self.session.service("ALAnimationPlayer")
        self.life = self.session.service("ALAutonomousLife")
        self.perception = self.session.service("ALPeoplePerception")
        self.tracker = self.session.service("ALTracker")

        #Setup
        #self.perception.setTimeBeforePersonDisappears(5.0) #seconds
        #self.perception.setMaximumDetectionRange(2) #meters
        self.life.setAutonomousAbilityEnabled("All",False)
        self.life.setAutonomousAbilityEnabled("SpeakingMovement", True)
        self.tracker.unregisterAllTargets()
        self.motion.setBreathEnabled("Arms",True)
        #TODO breathing chest/head?
        self.posture.applyPosture('Stand',0.5)
        self.notification = self.session.service("ALNotificationManager")


        try:
            folder = os.path.basename(os.path.dirname(os.path.realpath(__file__)))
            self.ts = self.session.service("ALTabletService")
            self.ts.loadApplication(folder) #may be disrupted if launched before or simultaniously with ALAutonomousLife.setState('interactive')
            print "ts.loadApplication(folder)= " + folder
            self.ts.showWebview()
            self.logger.info("Tablet loaded!")
        except Exception, e:
            print e #todo delete and just read robot log...
            self.logger.error(e)
            self.notification.add(
                {"message": "loading error. I cant use my tablet", "severity": "warning", "removeOnRead": True})
            _strMessage = __file__ + "\n" + "Exception occurred on " + str(datetime.datetime.now()) + "\n" + str(e)
            #self.systemMail.sendMessage(_strMessage)


        self.memory = self.session.service("ALMemory")

        # tablet interaction
        # cb = callback, id = signal id, me = memory event
        #self.cb_tablet_button = self.memory.subscriber('tabletButtonPress')
        #self.id_tablet_button = self.cb_tablet_button.signal.connect(self.func_tablet_button)

        #self.cb_tablet_timer = self.memory.subscriber('me_tablet_timer_event')
        #self.id_tablet_timer = self.cb_tablet_timer.signal.connect(self.func_tablet_timer)

        self.perception.resetPopulation()
        self.logger.info("Initialized!")
        self.say_feedback = ["hvor er du god til at læse højt",
                             "det er du rigtig god til",
                             "årh det er spændende",
                             "det er dejligt at høre historier"]



    @qi.nobind
    def start_app(self):
        self.logger.info("Started!")
        print "\033[95m Starting app \033[0m"
        self.audio.playSoundSetFile('sfx_confirmation_1')

        #self.listener = Listener() #init listener class



    @qi.nobind
    def headtouchEvent(self,var):
        if var == 0.0:
            return #triggers both when hand touches and when it is lifted.
        self.callbackMiddleTactile.signal.disconnect(self.intSignalIDHeadtouch)
        #print "signal disconnected: intSignalIDHeadtouch = " + str(self.intSignalIDHeadtouch)
        self.intSignalIDHeadtouch = self.callbackMiddleTactile.signal.connect(self.headtouchEvent)
        #print "signal connected: self.intSignalIDHeadtouch = " + str(self.intSignalIDHeadtouch)

    @qi.nobind
    def tabletbuttonevent(self, var):
        print var

    @qi.nobind
    def stop_app(self):
        # To be used if internal methods need to stop the service from inside.
        # external NAOqi scripts should use ALServiceManager.stopService if they need to stop it.
        
        self.logger.info("Stopping service...")
        self.application.stop()
        # TODO call al behaviormanager and stop the behavior. It block s The Dialog ?
        self.logger.info("Stopped!")


    @qi.nobind
    def cleanup(self):
        # called when your module is stopped
        self.logger.info("Cleaning...")
        self.ts.resetTablet()
        #TODO Unregister subscribed signals?? Or are they automatically removed when service is unregistered in the last line of main.py?
        #self.leds.on("FaceLeds")
        self.logger.info("Cleaned!")


if __name__ == "__main__":
    # with this you can run the script for tests on remote robots
    # run : python main.py --qi-url 123.123.123.123
    app = qi.Application(sys.argv)
    app.start()
    service_instance = PythonReadingBuddy(app)
    service_id = app.session.registerService(service_instance.service_name, service_instance)
    service_instance.start_app()
    app.run()

    service_instance.cleanup()
    app.session.unregisterService(service_id)