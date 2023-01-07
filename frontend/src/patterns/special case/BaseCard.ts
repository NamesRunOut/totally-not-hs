abstract class BaseCard {
    _id: number = 0;
    _name: string = "";
    _image: any;
    _basicPrice: number;
    _rarePrice: number;
    _description: string;
    _mana: number;
    _atk: number;
    _hp: number;

    constructor(id: number, name: string, image: any, basicPrice: number, rarePrice: number, description: string, mana: number, atk: number, hp: number) {
        this._id = id
        this._name = name
        this._image = image
        this._basicPrice = basicPrice
        this._rarePrice = rarePrice
        this._description = description
        this._mana = mana
        this._atk = atk
        this._hp = hp
    }

    abstract buyIt(dispatch:any,id:number,currency: string,setNotification: any,ownCoins: number): void

    abstract get rarePrice(): number
    abstract set basicPrice(value: number)
    abstract get image(): any
    abstract set image(value: any)
    abstract get id(): number
    abstract set id(id: number)
    abstract get name(): string
    abstract set name(value: string)
    abstract get description(): string
    abstract set description(value: string)
    abstract get hp(): number
    abstract set hp(value: number)
    abstract get atk(): number
    abstract set atk(value: number)
    abstract get mana(): number
    abstract set mana(value: number)
}

export default BaseCard