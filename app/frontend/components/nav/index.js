// import "./index.css"
// We reserve Controller for the export name
import { Controller as BaseController } from "@hotwired/stimulus";

export default class Controller extends BaseController {
  connect() {
    console.log(window.location.pathname);
  }
}
