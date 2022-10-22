// import "./index.css"
// We reserve Controller for the export name
import { Controller as BaseController } from "@hotwired/stimulus";

const IdSelectorsByPath = {
  "/messages": "nav-item-messages",
  "/queries": "nav-item-queries",
  "/": "nav-item-messages",
};

export default class Controller extends BaseController {
  connect() {
    this.selectNavItem(IdSelectorsByPath[window.location.pathname]);
  }

  selectNavItem(id) {
    console.log(id);
  }
}
