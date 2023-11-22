import '../components/MyButton';
import type { Meta, StoryObj } from '@storybook/web-components';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  component: 'my-button',
} as Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {},
};
