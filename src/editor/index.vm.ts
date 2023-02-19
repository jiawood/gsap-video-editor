import { makeAutoObservable } from 'mobx';
import gsap from 'gsap'


// 需要你有一个序列化的数组，每个的数据有很多属性，根据属性进行dom节点的渲染，和动画的生成

export default class VM {
    constructor(q: gsap.utils.SelectorFunc) {
        makeAutoObservable(this)
        this.q = q 
    }
    mainTl: gsap.core.Timeline = gsap.timeline();
    q;
    progressValue: number = 0;
    t1: gsap.core.Timeline  = gsap.timeline();
    t2: gsap.core.Timeline  = gsap.timeline();

    init = () => {
        this.t1.to(this.q('.box1'), {
            x: 200,
            duration: 1
        })
        this.t2.to(this.q('.box2'), {
             x: 200,
            duration:1 
        })
        this.mainTl.add(this.t1).add(this.t2)
        this.mainTl.play()
    }

    setAniProgress = () => {
        this.mainTl.progress(this.progressValue).pause()
    }

    setProgressValue = (value: number) => {
        this.progressValue = value
        this.setAniProgress()
    }

    pause = () => {
        this.mainTl.pause()
    }

    play = () => {
        if(!this.mainTl.isActive()){
            this.mainTl.restart()
            return
        }
        this.mainTl.play()
    }


}

