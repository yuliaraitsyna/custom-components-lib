import {Button} from './Button';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'button',
    color: 'primary',
    variant: 'contained',
    size: 'small',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    children: 'button',
    color: 'secondary',
    variant: 'outlined',
    size: 'medium',
    onClick: () => alert('clicked'),
    disabled: false,
  },
};

export const Error: Story = {
  args: {
    children: 'button',
    color: 'error',
    variant: 'text',
    size: 'large',
    onClick: () => alert('clicked'),
    disabled: false,
  },
};

export const Success: Story = {
  args: {
    children: 'button',
    color: 'success',
    variant: 'contained',
    size: 'small',
    onClick: () => alert('clicked'),
    disabled: false,
  },
};

export const Warning: Story = {
  args: {
    children: 'button',
    color: 'warning',
    variant: 'outlined',
    size: 'medium',
    onClick: () => alert('clicked'),
    disabled: false,
  },
};

export const Info: Story = {
  args: {
    children: 'button',
    color: 'info',
    variant: 'text',
    size: 'large',
    onClick: () => alert('clicked'),
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: 'button',
    color: 'primary',
    variant: 'contained',
    size: 'small',
    onClick: () => alert('clicked'),
    disabled: true,
  },
};
