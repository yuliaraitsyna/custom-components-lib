import type {Meta, StoryObj} from '@storybook/react';
import Modal from './Modal';
import React from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
    open: true,
    onClose: () => console.log('close'),
    children: [React.createElement('h1', {}, 'Header'), React.createElement('p', {}, 'This is a modal window')],
  },
};
