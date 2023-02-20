import { makeAutoObservable } from 'mobx';
import gsap from 'gsap'
import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'
import { Item } from '../type';


// 需要你有一个序列化的数组，每个的数据有很多属性，根据属性进行dom节点的渲染，和动画的生成

export default class VM {
    constructor(q: gsap.utils.SelectorFunc) {
        makeAutoObservable(this)
        this.q = q 
    }
    mainTl: gsap.core.Timeline = gsap.timeline();
    q;
    progressValue: number = 0;

    itemList: Item[] = [
        {
            type: 'image',
            className: 'pic1',
            domProps: {
                src:pic1
            },
            aniType: 'scale',
            aniDuration: 2,
            aniStartTime: 0,
            tl: null,
        },
        {
            type: 'image',
            className: 'pic2',
            domProps: {
                src:pic2
            },
            aniType: 'scale',
            aniDuration: 2,
            aniStartTime: 1,
            tl: null,
        }
    ]

    init = () => {
        this.generateAni()
        this.mainTl.play()
    }

    generateAni = () => {
        // this.mainTl.clear()
        for(let i = 0; i < this.itemList.length; i++){
            const item = this.itemList[i]
            const t = gsap.timeline() 
            item.tl = t 
            t.to(this.q('.'+item.className),{scale: 2, duration: item.aniDuration})
            this.mainTl.add(t,item.aniStartTime)
        }
    }

    add = () => {
        this.itemList = this.itemList.concat({
            type: 'image',
            className: 'pic3',
            domProps: {
                src:pic2
            },
            aniType: 'scale',
            aniDuration: 1,
            aniStartTime: 2,
            tl: null,
        })
        console.log('add',this.itemList)
        setTimeout(() => {
            this.generateAni()
        },100)
    }

    remove = () => {
        this.mainTl.remove(this.itemList[2].tl)
        this.itemList.pop()
        this.itemList = this.itemList
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
        console.log(this.mainTl)
        if(!this.mainTl.isActive()){
            this.mainTl.restart()
            return
        }
        this.mainTl.play()
    }


}

