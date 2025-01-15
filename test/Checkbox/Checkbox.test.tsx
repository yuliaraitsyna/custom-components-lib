import {fireEvent, render, screen} from '@testing-library/react';
import {Checkbox} from '../../src/components/Checkbox/Checkbox';
import React from 'react';

describe('Checkbox tests', () => {
  it('should render a default checkbox', () => {
    render(<Checkbox />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render a checkbox with label', () => {
    render(<Checkbox label="checkbox label" />);
    expect(screen.getByText('checkbox label')).toBeInTheDocument();
  });

  it('should render a required checkbox with label', () => {
    render(<Checkbox label="label" required />);
    expect(screen.getByText('label*')).toBeInTheDocument();
  });

  it('should render a checked checkbox', () => {
    render(<Checkbox checked />);
    expect(screen.getByRole('button')).toHaveClass('checkbox checked');
  });

  it('should render a disabled checkbox', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('button')).toHaveClass('checkbox disabled');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should handle checkbox click with onChange', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    const checkbox = screen.getByRole('button');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should not handle checkbox click when disabled', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} disabled />);
    const checkbox = screen.getByRole('button');
    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should uncheck when clicked', () => {
    render(<Checkbox checked />);
    const checkbox = screen.getByRole('button');
    fireEvent.click(checkbox);
    expect(checkbox).not.toHaveClass('checkbox checked');
  });

  it('should have all form attributes', () => {
    const mockURL = 'https://example.com';
    render(
      <form id="form">
        <Checkbox form="form" formAction={mockURL} formMethod="POST" />
      </form>,
    );
    const checkbox = screen.getByRole('button');
    expect(checkbox).toHaveAttribute('form', 'form');
    expect(checkbox).toHaveAttribute('formaction', mockURL);
    expect(checkbox).toHaveAttribute('formmethod', 'POST');
  });

  it('should be auto focused', () => {
    render(<Checkbox autoFocus />);
    const checkbox = screen.getByRole('button');
    expect(checkbox).toHaveFocus();
  });
});
