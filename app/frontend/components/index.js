// We recommend putting Stimulus application instance into its own
// module, so you can use it for non-component controllers

// init/stimulus.js
import { Application } from "stimulus";
export const application = Application.start();

// components/index.js
import { application } from "../init/stimulus";

const context = require.context(".", true, /index.js$/)
context.keys().forEach((path) => {
  const mod = context(path);

  // Check whether a module has the Controller export defined
  if (!mod.Controller) return;

  // Convert path into a controller identifier:
  //   example/index.js -> example
  //   nav/user_info/index.js -> nav--user-info
  const identifier = path.replace(/^\.\//, '')
    .replace(/\/index\.js$/, '')
    .replace(/\//g, '--');

  application.register(identifier, mod.Controller);
});
