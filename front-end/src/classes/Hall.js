import { nanoid } from 'nanoid'

class Hall {
    constructor(name, location, img, tel, map) {
        this.id =nanoid()
        this.name = name,
        this.location = location,
        this.img = img,
        this.tel = tel,
        this.map = map,
        this.events=[]
          
    } 
}
 
export default Hall