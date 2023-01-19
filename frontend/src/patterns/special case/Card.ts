import BaseCard from "./BaseCard";
import {InfoNotificationCreator} from "../factory-method";

class Card extends BaseCard {
    buyIt(dispatch:any, id:number, currency: string, setNotification: any, ownCoins: number){
        // update user inventory with that card
        const price = currency === "R" ? this.rarePrice : this.basicPrice
        if (price > ownCoins) {
            setNotification(new InfoNotificationCreator("You don't have enough coins").getNotification())
            return
        }
        dispatch({type: "addCard", id: id, currency: currency, price: price})
    }

    get rarePrice(): number {
        return this._rarePrice;
    }
    set rarePrice(price: number) {
        this._rarePrice = price;
    }
    get basicPrice() {
        return this._basicPrice;
    }
    set basicPrice(value: number) {
        this._basicPrice = value;
    }
    get image(): any {
        return this._image;
    }
    set image(value: any) {
        this._image = value;
    }
    get id(): number {
        return this._id;
    }
    set id(id: number) {
        this._id = id;
    }
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
    get description(): string {
        return this._description;
    }
    set description(value: string) {
        this._description = value;
    }
    get hp(): number {
        return this._hp;
    }
    set hp(value: number) {
        this._hp = value;
    }
    get atk(): number {
        return this._atk;
    }
    set atk(value: number) {
        this._atk = value;
    }
    get mana(): number {
        return this._mana;
    }
    set mana(value: number) {
        this._mana = value;
    }
}

export default Card