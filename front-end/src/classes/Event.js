import { nanoid } from 'nanoid'

class Event {
    constructor(title, video, img, desc) {
        this.id = nanoid()
        this.title = title,
            this.img = img,
            this.video = video,
            this.desc = desc

    } 
}

export default Event