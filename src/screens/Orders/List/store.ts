import { makeAutoObservable } from "mobx";
import { OrdersListItem } from "./types";
import { createBrowserHistory, History } from "history";
import client from "api/gql";
import { GET_ORDERS_QUERY } from "~/screens/Orders/List/queries";

export default class OrdersListState {
  initialized = false;
  loading = false;
  page = Number(new URL(window.location.href).searchParams.get("page")) || 1;
  totalPages = 1;
  orders: OrdersListItem[] = [];
  history: History;

  constructor() {
    makeAutoObservable(this);
    this.history = createBrowserHistory();
  }

  setOrders(orders: OrdersListItem[]): void {
    this.orders = orders;
  }

  setPage(page: number): void {
    this.page = page;
    const url = new URL(window.location.href);
    if (url.searchParams.get("page") !== this.page.toString()) {
      url.searchParams.set("page", "" + this.page);
      this.history.replace(url.pathname + url.search, {});
    }
  }

  nextPage(): void {
    if (this.page >= this.totalPages) return;
    this.setPage(this.page + 1);
    this.loading = true;
    this.loadOrders(this.page);
  }

  prevPage(): void {
    if (this.page <= 1) return;
    this.setPage(this.page - 1);
    this.loading = true;
    this.loadOrders(this.page);
  }

  setTotalPages(totalPages: number): void {
    this.totalPages = totalPages;
  }

  get canNext(): boolean {
    return this.page < this.totalPages;
  }

  get canPrev(): boolean {
    return this.page > 1;
  }

  async loadOrders(page: number) {
    this.loading = true;
    const res = await client.query( GET_ORDERS_QUERY, {page} ).toPromise()
    const {orders, pagination} = res.data.getOrders
    this.setOrders(orders)
    this.setTotalPages(pagination.totalPageCount)
    this.loading = false;
  }

  // initialize() {
  //   if (this.initialized) return;
  //   this.initialized = true;
  //   this.loadOrders(1);
  // }
}
