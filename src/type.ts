export interface Item {
    id: number,
    type: 'image'| 'text',
    className: string,
    domProps: any,
    aniType: 'scale',
    aniDuration: number,
    aniStartTime: number,
    tl: any,
}