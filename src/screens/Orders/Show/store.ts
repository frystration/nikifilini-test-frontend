import { makeAutoObservable } from "mobx";
import { SingleOrder } from "~/screens/Orders/Show/types";
import client from "~/api/gql";
import {ORDER_QUERY} from "~/screens/Orders/Show/queries";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;
  loading: boolean = false;
  error: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOrder(order: SingleOrder){
    console.log(order);
    this.order = order
  }

  async getOneOrder(number: string) {
    this.loading = true;
    const res = await client.query( ORDER_QUERY, {number} ).toPromise()
    console.log(res.data.getOneOrder);
    this.id = number
    this.setOrder(res.data.getOneOrder)
    this.loading = false;
  }
}

