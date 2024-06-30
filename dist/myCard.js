"use strict";
const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="src/myCard.css">

  <article class="my-card">
    <slot name="title"></slot>
    <main>
      <slot></slot>
    </main>
    <p id="button-clicked" class="show">Button clicked</p>
  </article>
`;
class MyCard extends HTMLElement {
    constructor() {
        super();
        this.isButtonClicked = false;
        const shadow = this.attachShadow({ mode: "open" });
        let clone = template.content.cloneNode(true);
        shadow.append(clone);
    }
    static get observedAttributes() {
        return ["clicks", "title-color"];
    }
    attributeChangedCallback(name, _, newValue) {
        if (name === "clicks") {
            this.handleToggleAlert();
        }
        if (name === "title-color") {
            this.style.setProperty("--headline-color", newValue);
        }
    }
    handleToggleAlert() {
        var _a, _b;
        this.isButtonClicked = !this.isButtonClicked;
        (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById("button-clicked")) === null || _b === void 0 ? void 0 : _b.classList.toggle("show", this.isButtonClicked);
    }
    handleColorChange(event) {
        const newColor = event.target.value;
        this.setAttribute("title-color", newColor);
    }
}
customElements.define("my-card", MyCard);
