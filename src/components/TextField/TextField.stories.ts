import type {Meta, StoryObj} from '@storybook/react';
import {TextField} from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  args: {
    placeholder: 'username',
  },
};

export const Secondary: Story = {
  args: {
    placeholder: 'password',
    error: true,
  },
};
