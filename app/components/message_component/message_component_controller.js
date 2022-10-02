import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static classes = ["loading"]

  connect() {
    console.log("Message Component Controller connected.")
  }
}
