import EventListener from './eventListener';

export default class Timer extends EventListener {

  private startTime: number = Date.now();

  private timer: ReturnType<typeof setTimeout>;

  private lastTime: number = Date.now();

  get leftTime() {
    return this.duration - (this.lastTime - this.startTime);
  }

  constructor(public duration: number) {
    super();

    this.timer = setTimeout(() => {
      this.triggerEvent('finished');

      this.lastTime = Date.now();
    }, duration);
  }

  pause() {
    this.triggerEvent('pause');

    clearTimeout(this.timer);

    this.lastTime = Date.now();
  }

  resume() {
    this.triggerEvent('resume');

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.triggerEvent('finished');

      this.lastTime = Date.now();
    }, this.leftTime);
  }

}
