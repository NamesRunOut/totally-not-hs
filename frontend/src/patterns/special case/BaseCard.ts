abstract class BaseCard {
    id: number = 0;
    name: string = "";
    image: any;

    constructor(id: number, name: string, image: any) {
        this.id = id
        this.name = name
        this.image = image
    }

    abstract buyIt(user: any): void
}


export default BaseCard