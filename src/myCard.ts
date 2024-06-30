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
  isButtonClicked: boolean = false;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    let clone = template.content.cloneNode(true);
    shadow.append(clone);
  }

  static get observedAttributes() {
    return ["clicks", "title-color"];
  }

  attributeChangedCallback(name: any, _: any, newValue: any) {
    if (name === "clicks") {
      this.handleToggleAlert();
    }

    if (name === "title-color") {
      this.style.setProperty("--headline-color", newValue);
    }
  }

  handleToggleAlert() {
    this.isButtonClicked = !this.isButtonClicked;

    this.shadowRoot
      ?.getElementById("button-clicked")
      ?.classList.toggle("show", this.isButtonClicked);
  }

  handleColorChange(event: any) {
    const newColor = event.target.value;
    this.setAttribute("title-color", newColor);
  }
}

customElements.define("my-card", MyCard);
