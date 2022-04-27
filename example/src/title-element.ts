import { html, LitElement } from "lit";
import { customElement, property } from 'lit/decorators.js'

@customElement('title-element')
export class TitleElement extends LitElement {
  @property()
  private name?: string;

  render() {
    return html`
      <h1>${this.name || ''}</h1>
    `
  }
}