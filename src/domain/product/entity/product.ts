import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super(id);
    this._name = name;
    this._price = price;
    if (!this.validate()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    if (!this.validate()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changePrice(price: number): void {
    this._price = price;
    if (!this.validate()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(): boolean {
    // if (this._id.length === 0) {
    //   this.notification.addError({ context: "Product", message: "Id is required" });
    // }
    // if (this._name.length === 0) {
    //   this.notification.addError({ context: "Product", message: "Name is required" });
    // }
    // if (this._price < 0) {
    //   this.notification.addError({ context: "Product", message: "Price must be greater than zero" });
    // }
    ProductValidatorFactory.create().validate(this);
    return !this.notification.hasErrors();
  }
}
