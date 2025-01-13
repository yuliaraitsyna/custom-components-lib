import {Button} from '../../src/components/Button/Button';
import {fireEvent, render, screen} from '@testing-library/react';

describe('Button tests', () => {
  it('should render a default button', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('button primary contained small');
  });

  it('should render error large text button', () => {
    render(<Button color="error" variant="text" size="large" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('button error text large');
  });

  it('should render warning outlined medium button', () => {
    render(<Button color="warning" variant="outlined" size="medium" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('button warning outlined medium');
  });

  it('should trigger onClick event', () => {
    const handleClick = jest.fn();
    render(<Button color="success" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled', () => {
    render(<Button disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render children', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click');
  });

  it('should render button with form attributes', () => {
    const mockURL = 'https://example.com';

    render(
      <form id="form-id">
        <Button form="form-id" type="submit" formAction={mockURL} />
      </form>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('form', 'form-id');
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    expect(screen.getByRole('button')).toHaveAttribute('formAction', mockURL);
  });
});
