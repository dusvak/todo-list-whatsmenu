import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render the button with the correct text', () => {
    render(<Button>Clique aqui</Button>);
    const buttonElement = screen.getByText(/clique aqui/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', async () => {
    const onClickMock = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClickMock}>Clique em mim</Button>);

    const buttonElement = screen.getByText(/clique em mim/i);

    await user.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
