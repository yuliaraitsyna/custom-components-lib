import Checkbox from './Checkbox';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    label: 'checkbox label',
    onChange: () => console.log('changed'),
    required: true,
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'label',
    onChange: () => console.log('changed'),
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'checkbox label',
    onChange: () => console.log('changed'),
    required: true,
    checked: false,
    disabled: true,
  },
};
