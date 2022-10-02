// import "./index.css"
// We reserve Controller for the export name
import { Controller as BaseController } from "@hotwired/stimulus";

export default class Controller extends BaseController {
  connect() {
    console.log("Loaded Controller")
  }

  destroy(event) {
    const http = new XMLHttpRequest();
    const href = event.target.getAttribute("data-href");
    const csrf_token = event.target.getAttribute("data-csrf-token");
    http.open('DELETE', href);
    http.setRequestHeader('X-CSRF-Token', csrf_token);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('Accept', 'application/json')
    http.onreadystatechange = (e) => {
      console.log(http.responseText)
    }
    http.send();
  }
}
