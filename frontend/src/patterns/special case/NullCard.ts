import BaseCard from "./BaseCard";

class NullCard extends BaseCard {
    buyIt(){
        // do nothing
    }

    get rarePrice(): number {
        return 0;
    }
    set rarePrice(price: number) {}
    get basicPrice() {
        return 0;
    }
    set basicPrice(value: number) {}
    get image(): any {
        return "";
    }
    set image(value: any) {}
    get id(): number {
        return -1;
    }
    set id(id: number) {
        this._id = -1;
    }
    get name(): string {
        return "unknown";
    }
    set name(value: string) {}
    get description(): string {
        return "";
    }
    set description(value: string) {}
    get hp(): number {
        return 0;
    }
    set hp(value: number) {}
    get atk(): number {
        return 0;
    }
    set atk(value: number) {}
    get mana(): number {
        return 0;
    }
    set mana(value: number) {}
}

export default NullCard