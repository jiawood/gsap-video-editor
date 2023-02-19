export interface Item {
    type: 'image'| 'text',
    className: string,
    domProps: any,
    aniType: 'scale',
    aniDuration: number,
    aniStartTime: number,
}