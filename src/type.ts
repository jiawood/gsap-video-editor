export interface Item {
    id: number,
    type: 'image'| 'text' | 'filter' | 'convert',
    className: string,
    domProps: any,
    aniType: 'scale' | 'leftToRight' | 'topToBottom' |'filter'| 'convert'| 'none',
    aniDuration: number,
    aniStartTime: number,
    tl: gsap.core.Timeline,
}