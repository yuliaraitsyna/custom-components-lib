import type {Meta, StoryObj} from '@storybook/react';
import {Select} from './Select';
import React from 'react';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {
    label: 'username',
    onChange: () => alert('changed'),
    required: true,
    helperText: 'helper',
    children: [React.createElement('option', {key: 1, value: '1'}, '1')],
  },
};
