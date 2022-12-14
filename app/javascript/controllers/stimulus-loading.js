// Monkey patched from @hotwired/stimulus-loading
// https://github.com/hotwired/stimulus-rails/blob/2ffa31fcc7520331fefc2e78f1c5bd70446e038f/app/assets/javascripts/stimulus-loading.js

// FIXME: es-module-shim won't shim the dynamic import without this explicit import
import "@hotwired/stimulus"

const controllerAttribute = "data-controller"
const registeredControllers = {}

// Eager load all controllers registered beneath the `under` path in the import map to the passed application instance.
export function eagerLoadControllersFrom(under, application) {
  const paths = Object.keys(parseImportmapJson()).filter(path => path.match(new RegExp(`^${under}.*$`)))
  paths.forEach(path => registerControllerFromPath(path, under, application))
}

function parseImportmapJson() {
  return JSON.parse(document.querySelector("script[type=importmap]").text).imports
}

function registerControllerFromPath(path, under, application) {
  const name = path
    .replace(new RegExp(`^${under}/`), "")
    .replace(/\//g, "--")
    .replace(/_/g, "-")

  import(path)
    .then(module => registerController(name, module, application))
    .catch(error => console.debug(`Failed to register controller: ${name} (${path})`, error))
}


// Lazy load controllers registered beneath the `under` path in the import map to the passed application instance.
export function lazyLoadControllersFrom(under, application, element = document) {
  lazyLoadExistingControllers(under, application, element)
  lazyLoadNewControllers(under, application, element)
}

function lazyLoadExistingControllers(under, application, element) {
  queryControllerNamesWithin(element).forEach(controllerName => loadController(controllerName, under, application))
}

function lazyLoadNewControllers(under, application, element) {
  new MutationObserver((mutationsList) => {
    for (const { attributeName, target, type } of mutationsList) {
      switch (type) {
        case "attributes": {
          if (attributeName == controllerAttribute && target.getAttribute(controllerAttribute)) {
            extractControllerNamesFrom(target).forEach(controllerName => loadController(controllerName, under, application))
          }
        }

        case "childList": {
          lazyLoadExistingControllers(under, application, target)
        }
      }
    }
  }).observe(element, { attributeFilter: [controllerAttribute], subtree: true, childList: true })
}

function queryControllerNamesWithin(element) {
  return Array.from(element.querySelectorAll(`[${controllerAttribute}]`)).map(extractControllerNamesFrom).flat()
}

function extractControllerNamesFrom(element) {
  return element.getAttribute(controllerAttribute).split(/\s+/).filter(content => content.length)
}

function loadController(name, under, application) {
  import(controllerFilename(name, under))
    .then(module => registerController(name, module, application))
    .catch(error => console.debug(`Failed to autoload controller: ${name}`, error))
}

function controllerFilename(name, under) {
  return `${under}/${name.replace(/--/g, "/").replace(/-/g, "_")}`
}

function registerController(name, module, application) {
  if (name in registeredControllers) return

  console.log("Load stimulus component: ", name)
  application.register(name, module.default)
  registeredControllers[name] = true
}
