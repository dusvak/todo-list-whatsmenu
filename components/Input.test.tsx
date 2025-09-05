import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  it('should render correctly with a placeholder', () => {
    render(<Input placeholder="Digite seu nome" />);

    const inputElement = screen.getByPlaceholderText(/digite seu nome/i);

    expect(inputElement).toBeInTheDocument();
  });

  it('should update its value when the user types', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Digite algo" />);

    const inputElement = screen.getByPlaceholderText(/digite algo/i) as HTMLInputElement;

    await user.type(inputElement, 'Olá Mundo');

    expect(inputElement.value).toBe('Olá Mundo');
  });
});
