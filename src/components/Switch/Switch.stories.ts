import type {Meta, StoryObj} from '@storybook/react/*';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  args: {
    label: 'switch label',
    required: true,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'checked switch',
    required: false,
    checked: true,
    onChange: () => console.log('check'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'checked switch',
    required: false,
    checked: true,
    disabled: true,
    onChange: () => console.log('check'),
  },
};
