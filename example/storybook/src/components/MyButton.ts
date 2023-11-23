import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-button')
export class MyButton extends LitElement {
  static styles = css`p { color: blue }`;

  @property() color = 'red';

  @property({ type: String }) background = 'red';

  @property() label: string = 'test';

  render() {
    return html`
        <button style="background: ${this.background}">${this.label}</button>
    `;
  }
}
