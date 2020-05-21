class Note {
  static get toolbox() {
    return {
      title: "Image",
      icon: ``,
    };
  }
  constructor() {
    this.wrapper = undefined;
  }
  render() {
    const div = document.createElement("div");
    div.contentEditable = true;
    div.classList.add("cdx-input");
    this.wrapper.appendChild(div);
    return;
  }
  save() {}
}
