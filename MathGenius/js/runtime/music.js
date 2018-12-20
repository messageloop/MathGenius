let instance

var reareadyGoAudio
var trueAudio
var falseAudio
var titckAudio


/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.readyGoAudio = wx.createInnerAudioContext();
    this.readyGoAudio.src = 'audio/readygo.mp3'

    this.trueAudio = wx.createInnerAudioContext();
    this.trueAudio.src = 'audio/true.mp3'

    this.falseAudio = wx.createInnerAudioContext();
    this.falseAudio.src = 'audio/false.mp3'

    this.titckAudio = wx.createInnerAudioContext();
    this.titckAudio.loop = true
    this.titckAudio.src = 'audio/titck.mp3'

    // this.playBgm()
  }


  playTrue(){
    this.trueAudio.currentTime = 0
    this.trueAudio.play()
  }

  playFlase() {
    this.falseAudio.currentTime = 0
    this.falseAudio.play()
  }

  playTrue() {
    this.titckAudio.currentTime = 0
    this.titckAudio.play()
  }

  playTrue() {
    this.readyGoAudio.currentTime = 0
    this.readyGoAudio.play()
  }

}
