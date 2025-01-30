import {fireEvent, render, screen} from '@testing-library/react';
import {Modal} from '../../src/components/Modal/Modal';
import React from 'react';

describe('Modal tests', () => {
  it('should render a default modal', () => {
    render(<Modal open={true} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should render a modal with children', () => {
    render(
      <Modal open={true}>
        <h1>Modal header</h1>
        <p>modal content</p>
      </Modal>,
    );
    expect(screen.getByText('Modal header')).toBeInTheDocument();
    expect(screen.getByText('modal content')).toBeInTheDocument();
  });

  it('should render a modal with close button', () => {
    render(<Modal open={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should provide className prop', () => {
    render(<Modal open={true} className="customClass" />);

    expect(screen.getByRole('dialog')).toHaveClass('customClass');
  });
});
