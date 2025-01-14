import {fireEvent, render, screen} from '@testing-library/react';
import {Select} from '../../src/components/Select/Select';

describe('Select tests', () => {
  it('should render default Select', () => {
    render(<Select />);

    expect(screen.getByRole('input')).toBeInTheDocument();
  });

  it('should render Select with required label', () => {
    render(<Select label="label" required />);

    expect(screen.getByText('label*')).toBeInTheDocument();
    expect(screen.getByRole('input')).toBeRequired();
  });

  it('should reneder Select with options', () => {
    render(
      <Select>
        <option>1</option>
      </Select>,
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should include form attributes', () => {
    render(
      <form id="form">
        <Select form="form">
          <option>1</option>
        </Select>
      </form>,
    );

    expect(screen.getByRole('input')).toHaveAttribute('form', 'form');
  });

  it('should render Select with helper text', () => {
    render(<Select helperText="helper text" />);

    expect(screen.getByText('helper text')).toBeInTheDocument();
  });

  it('should render Select with value', () => {
    render(
      <Select value={1}>
        <option>1</option>
      </Select>,
    );

    expect((screen.getByRole('input') as HTMLInputElement).value).toEqual('1');
  });

  it('should handle onFocus when focused', () => {
    const handleFocus = jest.fn();

    render(
      <Select onFocus={handleFocus}>
        <option>1</option>
      </Select>,
    );

    const select = screen.getByRole('input');
    fireEvent.focus(select);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle onFocus with button', () => {
    const handleFocus = jest.fn();

    render(
      <Select onFocus={handleFocus}>
        <option>1</option>
      </Select>,
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle onBlur when blurred', () => {
    const handleBlur = jest.fn();

    render(
      <Select onBlur={handleBlur}>
        <option>1</option>
      </Select>,
    );

    const select = screen.getByRole('input');
    fireEvent.blur(select);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should handle onChange when choosing an option', () => {
    const handleChange = jest.fn();
    const handleFocus = jest.fn();

    render(
      <Select label="Test Select" onChange={handleChange} onFocus={handleFocus}>
        <option value="1">1</option>
        <option value="2">2</option>
      </Select>,
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    const input = screen.getByRole('input');
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledTimes(2);

    const option = screen.getByText('1');
    fireEvent.mouseDown(option);
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should open and close options', () => {
    render(
      <Select>
        <option>1</option>
      </Select>,
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    const menu = screen.getByRole('menu');

    expect(menu).toBeInTheDocument();
    expect(menu).toHaveClass('open');

    fireEvent.click(toggleButton);

    expect(menu).toBeInTheDocument();
    expect(menu).not.toHaveClass('open');
  });
});
