import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A title element.
 *
 * @element title-element
 *
 */
@customElement('title-element')
export class TitleElement extends LitElement {
  @property()
  public value: string = 'Title';

  render() {
    return html`
      <h1>${this.value || ''}</h1>
    `;
  }
}
