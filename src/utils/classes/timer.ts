import EventEmitter from './eventEmitter';

type TimerEvents = "finished" | "pause" | "resume"
type TimerEventMap = Record<TimerEvents, undefined>

export default class Timer extends EventEmitter< TimerEventMap > {

  private startTime: number = Date.now();

  private timer: ReturnType<typeof setTimeout>;

  private lastTime: number = Date.now();

  get leftTime() {
    return this.duration - (this.lastTime - this.startTime);
  }

  constructor( public duration: number ) {

    super();

    this.timer = setTimeout(() => {

      this.triggerEvent('finished', undefined);

      this.lastTime = Date.now();
    
    }, duration);
  
  }

  pause() {

    clearTimeout(this.timer);

    this.lastTime = Date.now();
    
    this.triggerEvent('pause', undefined);

  }

  resume() {
    
    clearTimeout(this.timer);
    
    this.timer = setTimeout(() => {
      
      this.triggerEvent('finished', undefined);
      
      this.lastTime = Date.now();

    }, this.leftTime);

    this.triggerEvent('resume', undefined);
  
  }

}
