import { makeAutoObservable } from "mobx";
import gsap from "gsap";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import { Item } from "../type";

// 需要你有一个序列化的数组，每个的数据有很多属性，根据属性进行dom节点的渲染，和动画的生成

export default class VM {
  constructor(q: gsap.utils.SelectorFunc) {
    makeAutoObservable(this);
    this.q = q;
  }
  mainTl: gsap.core.Timeline = null;
  q;
  progressValue: number = 0;
  totalTime = 0;
  curTime = 0;

  selectedIndex = -1;

  itemList: Item[] = [
    {
      id: Math.random(),
      type: "image",
      className: "pic1",
      domProps: {
        src: pic1,
        x: 50,
        y: 50,
      },
      aniType: "scale",
      aniDuration: 2,
      aniStartTime: 0,
      tl: null,
    },
    {
      id: Math.random(),
      type: "image",
      className: "pic2",
      domProps: {
        src: pic2,
        x: 70,
        y: 80,
      },
      aniType: "leftToRight",
      aniDuration: 2,
      aniStartTime: 1,
      tl: null,
    },
    {
      id: Math.random(),
      type: "text",
      className: "text" + Math.floor(Math.random() * 1000),
      domProps: {
        text: "嘉木",
        color: "black",
        fontSize: 23,
        x: 200,
        y: 250,
      },
      aniType: "none",
      aniDuration: 0,
      aniStartTime: 0,
      tl: null,
    },
  ];

  init = () => {
    this.mainTl = gsap.timeline({
      onUpdate: () => {
        this.refreshProgress();
      },
    });
    this.initAni();
    this.mainTl.play();
  };

  refreshProgress = () => {
    this.progressValue = this.mainTl.progress();
    this.totalTime = this.mainTl.duration();
    this.curTime = this.progressValue * this.totalTime;
  };

  setCurTime = (value: number) => {
    this.curTime = value;
    this.progressValue = this.curTime / this.totalTime;
  };

  initAni = () => {
    for (let i = 0; i < this.itemList.length; i++) {
      const item = this.itemList[i];
      this.generateAni(item);
    }
  };

  generateAni = (item: Item) => {
    // this.mainTl.clear()

    if (item.aniType === "scale") {
      this.scale(item.id);
    }
    if (item.aniType === "leftToRight") {
      this.leftToRight(item.id);
    }
    if (item.aniType === "topToBottom") {
      this.topToBottom(item.id);
    }
    if (item.aniType === "none") {
      this.setNone(item.id);
    }
  };

  addPic = () => {
    const item: Item = {
      id: Math.random(),
      type: "image",
      className: "pic" + Math.floor(Math.random() * 1000),
      domProps: {
        src: pic3,
        x: 100,
        y: 120,
      },
      aniType: Math.random() > 0.5 ? "topToBottom" : 'scale',
      aniDuration: 2,
      aniStartTime: this.curTime,
      tl: null,
    };
    this.itemList = this.itemList.concat(item);
    setTimeout(() => {
      this.generateAni(item);
    }, 100);
  };

  addText = () => {
    const item: Item = {
      id: Math.random(),
      type: "text",
      className: "text" + Math.floor(Math.random() * 1000),
      domProps: {
        text: "嘉木" + Math.floor(Math.random() * 10000),
        color: "black",
        fontSize: 23,
        x: 200 * Math.random(),
        y: 250 * Math.random(),
      },
      aniType: Math.random() > 0.5 ? "none" : 'leftToRight',
      aniDuration: 1,
      aniStartTime: this.curTime,
      tl: null,
    };
    this.itemList = this.itemList.concat(item);
    setTimeout(() => {
      this.generateAni(this.itemList[this.itemList.length - 1]);
    }, 100);
  };

  remove = () => {
    this.mainTl.remove(this.itemList[2].tl);
    this.itemList.pop();
    this.itemList = this.itemList;
  };

  setAniProgress = () => {
    this.mainTl.progress(this.progressValue).pause();
  };

  setProgressValue = (value: number) => {
    this.progressValue = value;
    this.setAniProgress();
  };

  pause = () => {
    this.mainTl.pause();
  };

  play = () => {
    console.log(this.mainTl);
    if (this.progressValue < 1) {
      this.mainTl.resume();
      return;
    }
    if (!this.mainTl.isActive()) {
      this.mainTl.restart();
      return;
    }
    this.mainTl.play();
  };

  // 编辑模块
  editorItem = (item: Item, index: number) => {
    this.selectedIndex = index;
  };

  // 删除模块
  deleteItem = () => {
    console.log('de')
    console.log(this.selectedIndex,this.itemList)
    if (this.selectedIndex === -1) {
      return;
    }
    const itemList = this.itemList;
    this.mainTl.remove(itemList[this.selectedIndex].tl);
    itemList.splice(this.selectedIndex, 1);
    this.selectedIndex = -1;
    this.itemList = itemList;
  };

  // 定义一系列的动画
  scale = (id: number) => {
    const t = gsap.timeline();
    const item = this.getItemById(id)
    item.tl = t;

    t.set(this.q("." + item.className), {
      x: item.domProps.x,
      y: item.domProps.y,
    })
      .fromTo(
        this.q("." + item.className),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.01,
        }
      )
      .to(this.q("." + item.className), {
        scale: 2,
        duration: item.aniDuration,
      })
      .fromTo(
        this.q("." + item.className),
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.01,
        }
      );
    this.mainTl.add(t, item.aniStartTime);
  };

  leftToRight = (id: number) => {
    const t = gsap.timeline();
    const item = this.getItemById(id)
    item.tl = t;

    t.fromTo(
      this.q("." + item.className),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.01,
      }
    )
      .fromTo(
        this.q("." + item.className),
        {
          x: -200,
        },
        {
          x: 400,
          duration: item.aniDuration,
        }
      )
      .fromTo(
        this.q("." + item.className),
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.01,
        }
      );
    this.mainTl.add(t, item.aniStartTime);
  };

  topToBottom = (id: number) => {
    const t = gsap.timeline();
    const item = this.getItemById(id)
    item.tl = t;

    t.fromTo(
      this.q("." + item.className),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.01,
      }
    )
      .fromTo(
        this.q("." + item.className),
        {
          y: -100,
        },
        {
          y: 100,
          duration: item.aniDuration,
        }
      )
      .fromTo(
        this.q("." + item.className),
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.01,
        }
      );
    this.mainTl.add(t, item.aniStartTime);
  };

  setNone = (id: number) => {
    const t = gsap.timeline();
    const item = this.getItemById(id)
    item.tl = t;
    t.fromTo(
      this.q("." + item.className),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.01,
      }
    ).to(this.q("." + item.className), {
      x: item.domProps.x,
      y: item.domProps.y,
      color: item.domProps.color,
      fontSize: item.domProps.fontSize,
      duration: 0.2
    });
    this.mainTl.add(t, item.aniStartTime);
  };

  getItemById = (id: number) => {
    const itemList = this.itemList 
    for(let i = 0;i < itemList.length; i++){
      if(itemList[i].id === id){
        return itemList[i]
      }
    }
  }
}
