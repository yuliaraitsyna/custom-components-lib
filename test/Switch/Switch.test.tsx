import {fireEvent, render, screen} from '@testing-library/react';
import Switch from '../../src/components/Switch/Switch';
import React from 'react';

describe('Switch tests', () => {
  it('should render a default switch', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should render a switch with label', () => {
    render(<Switch label="switch label" />);
    expect(screen.getByText('switch label')).toBeInTheDocument();
  });

  it('should render a required switch with label', () => {
    render(<Switch label="label" required />);
    expect(screen.getByText('label*')).toBeInTheDocument();
  });

  it('should render a checked switch', () => {
    render(<Switch checked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('should render a disabled switch', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('should handle switch click with onChange', () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should be uncheked when clicked', () => {
    render(<Switch checked />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    expect(switchElement).not.toBeChecked();
  });

  it('should have type as checkbox', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toHaveAttribute('type', 'checkbox');
  });

  it('should have all form attributes', () => {
    const mockURL = 'https://example.com';

    render(
      <form id="form">
        <Switch form="form" formAction={mockURL} formMethod="POST" />
      </form>,
    );

    const switchElement = screen.getByRole('switch');

    expect(switchElement).toHaveAttribute('form', 'form');
    expect(switchElement).toHaveAttribute('formaction', mockURL);
    expect(switchElement).toHaveAttribute('formmethod', 'POST');
  });

  it('should support readonly attribute', () => {
    render(<Switch readOnly />);
    expect(screen.getByRole('switch')).toHaveAttribute('readonly');
  });

  it('should support autofocus attribute', () => {
    render(<Switch autoFocus />);
    expect(screen.getByRole('switch')).toHaveFocus();
  });

  it('should support custom classNames', () => {
    render(<Switch className="custom-class" />);
    expect(screen.getByRole('switch')).toHaveClass('custom-class');
  });
});
