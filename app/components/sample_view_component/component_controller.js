import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['container', 'frame', 'loader'];

  connect() {
    this.observer = new MutationObserver(this.frameMutated.bind(this))
    this.observer.observe(this.frameTarget, { attributes: true, childList: false, characterData: false   })

    // The HTML for the background element
    this.backgroundHtml = this._backgroundHTML();
  }

  disconnect() {
    this.observer.disconnect()
    delete this.observer
    this.close();
  }

  frameMutated () {
    if (this.frameTarget.hasAttribute('busy')) {
      this.loaderTarget.classList.remove('hidden');
      this.open();
    } else {
      this.loaderTarget.classList.add('hidden');
    }
  }

  open() {
    // Insert the background
    document.body.insertAdjacentHTML('beforeend', this.backgroundHtml);
    this.background = document.querySelector(`#${this.backgroundId}`);

    // Unhide the modal
    this.containerTarget.classList.remove("hidden");
  }

  close(e) {
    e.preventDefault();

    // Hide the modal
    this.containerTarget.classList.add("hidden");

    // Remove the background
    if (this.background) {
      this.background.remove();
      this.background = null;
      this.frameTarget.innerHTML = "";
    }
  }

  closeBackground(e) {
    if (e.target === this.containerTarget) {
      this.close(e);
    }
  }

  closeWithKeyboard(e) {
    if (e.keyCode === 27 && !this.containerTarget.classList.contains("hidden")) {
      this.close(e);
    }
  }

  _backgroundHTML() {
    return '<div id="modal-background" class="fixed top-0 left-0 w-full h-full " style="background-color: rgba(0, 0, 0, 0.4); z-index: 98;"></div>';
  }
}
