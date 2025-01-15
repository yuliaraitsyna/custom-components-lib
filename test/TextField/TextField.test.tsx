import {fireEvent, render, screen} from '@testing-library/react';
import {TextField} from '../../src/components/TextField/TextField';
import {Button} from '../../src/components/Button/Button';
import React from 'react';

describe('TextField tests', () => {
  it('should render a default text field', () => {
    render(<TextField />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render a text field with placeholder', () => {
    render(<TextField placeholder="placeholder" />);
    expect(screen.getByText('placeholder')).toBeInTheDocument();
  });

  it('should render a required text field with placeholder', () => {
    render(<TextField placeholder="placeholder" required />);

    const textField = screen.getByRole('textbox');

    expect(screen.getByText('placeholder*')).toBeInTheDocument();
    expect(textField).toBeRequired();
  });

  it('should render a text field with helper text', () => {
    render(<TextField helperText="helper text" />);
    expect(screen.getByText('helper text')).toBeInTheDocument();
  });

  it('should render a text field with error', () => {
    render(<TextField error helperText="error message" />);

    const textField = screen.getByRole('textbox');

    expect(textField).toHaveClass('textField error');
    expect(screen.getByText('error message')).toBeInTheDocument();
  });

  it('should render a focused text field with onFocus handling', () => {
    const handleFocus = jest.fn();

    render(<TextField onFocus={handleFocus} />);
    fireEvent.focus(screen.getByRole('textbox'));

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle onFocus when auto focused', () => {
    const handleFocus = jest.fn();

    render(<TextField onFocus={handleFocus} autoFocus />);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle onBlur when blurred', () => {
    const handleBlur = jest.fn();

    render(<TextField onBlur={handleBlur} autoFocus />);
    fireEvent.blur(screen.getByRole('textbox'));

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should handle onChange when changed', () => {
    const handleChange = jest.fn();

    render(<TextField onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), {target: {value: 'new value'}});

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should support all form attributes', () => {
    const mockURL = 'https://example.com';

    render(
      <form id="form">
        <TextField form="form" formAction={mockURL} formMethod="POST" />
        <Button type="submit">Submit</Button>
      </form>,
    );

    const textField = screen.getByRole('textbox');

    expect(textField).toHaveAttribute('form', 'form');
    expect(textField).toHaveAttribute('formaction', mockURL);
    expect(textField).toHaveAttribute('formmethod', 'POST');
  });

  it('should have type as text by default', () => {
    render(<TextField />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('should have type as password', () => {
    render(<TextField type="password" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password');
  });

  it('should have type as email', () => {
    render(<TextField type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('should have type as number', () => {
    render(<TextField type="number" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'number');
  });

  it('should have type as tel', () => {
    render(<TextField type="tel" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
  });

  it('should have type as search', () => {
    render(<TextField type="search" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'search');
  });

  it('should support min and max attributes', () => {
    render(<TextField type="number" min={0} max={10} />);
    const textField = screen.getByRole('textbox');

    expect(textField).toHaveAttribute('min', '0');
    expect(textField).toHaveAttribute('max', '10');
  });

  it('should support step attribute', () => {
    render(<TextField type="number" step={2} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('step', '2');
  });

  it('should support pattern attribute', () => {
    render(<TextField type="text" pattern="[A-Za-z]{3}" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('pattern', '[A-Za-z]{3}');
  });

  it('should support maxLength and minLength attributes', () => {
    render(<TextField type="text" maxLength={10} minLength={5} />);

    const textField = screen.getByRole('textbox');

    expect(textField).toHaveAttribute('maxlength', '10');
    expect(textField).toHaveAttribute('minlength', '5');
  });

  it('should support readonly attribute', () => {
    render(<TextField readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });
});
