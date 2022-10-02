import "./index.css"
// We reserve Controller for the export name
import { Controller as BaseController } from "stimulus";

export class Controller extends BaseController {
  connect() {
    console.log("Loaded Controller")
  }
}
