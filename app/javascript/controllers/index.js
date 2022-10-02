// Import and register all your controllers from the importmap under controllers/*

import { application } from "./application"

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "./stimulus-loading"
eagerLoadControllersFrom("controllers/components", application)

// Lazy load controllers as they appear in the DOM (remember not to preload controllers in import map!)
// import { lazyLoadControllersFrom } from "./stimulus-loading"
// lazyLoadControllersFrom("controllers/components", application)
