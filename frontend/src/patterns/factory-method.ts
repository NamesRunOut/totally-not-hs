interface notification { color: string, message: string }

abstract class Creator {
    public abstract factoryMethod(): Product;
    public getNotification(): notification {
        const product = this.factoryMethod();

        return product.create();
    }
}

export class InfoNotificationCreator extends Creator {
    msg: string = ""

    constructor(_msg: string) {
        super();
        this.msg = _msg
    }

    public factoryMethod(): Product {
        return new InfoNotification(this.msg);
    }
}

export class AlertNotificationCreator extends Creator {
    msg: string = ""

    constructor(_msg: string) {
        super();
        this.msg = _msg
    }

    public factoryMethod(): Product {
        return new AlertNotification(this.msg);
    }
}

interface Product {
    create(): notification;
}

class InfoNotification implements Product {
    msg: string = ""

    constructor(_msg: string) {
        this.msg = _msg
    }

    public create(): notification {
        return {
            color: 'blue',
            message: this.msg
        };
    }
}

class AlertNotification implements Product {
    msg: string = ""

    constructor(_msg: string) {
        this.msg = _msg
    }

    public create(): notification {
        return {
            color: 'red',
            message: this.msg
        };
    }
}