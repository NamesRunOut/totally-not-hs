const rate_R_to_B = 2
const rate_B_to_R = 1/2

export class Money{
    currency: string
    amount: number

    constructor(currency='BasicCurrency', amount=0){
        this.currency = currency
        this.amount = amount
    }

    getStringRepr(){
        let shortCurr = ""
        switch(this.currency){
            case "BasicCurrency":
                shortCurr = "B"
                break
            case "RareCurrency":
                shortCurr = "R"
                break
        }
        return `${shortCurr}.${this.amount}`
    }

    add(s:Money){
        if (s.currency !== this.currency) {
            return this
        }
        this.amount += s.amount
        return this
    }

    sub(s:Money){
        if (s.currency !== this.currency){
            return this
        }
        this.amount -= s.amount
        return this
    }

    mul(s:Money){
        if (s.currency !== this.currency){
            return this
        }
        this.amount *= s.amount
        return this
    }

    div(s:Money){
        if (s.currency !== this.currency){
            return this
        }
        this.amount /= s.amount
        return this
    }

    convertToCurrency(dest: string){
        if (this.currency === dest) return this
        if (dest === "RareCurrency") {
            this.currency = "RareCurrency"
            this.amount = this.amount*rate_B_to_R
        }
        if (dest === "BasicCurrency") {
            this.currency = "BasicCurrency"
            this.amount = this.amount*rate_R_to_B
        }
        return this
    }

    eq(s:Money){
        return this.amount === s.amount && this.currency === s.currency
    }
}

export const BasicCurrency = (am: number = 0) => {
    return new Money('BasicCurrency', am)
}

export const RareCurrency = (am: number = 0) => {
    return new Money('RareCurrency', am)
}