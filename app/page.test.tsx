import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './page';
import { vi } from 'vitest';

vi.mock('@/hooks/useIsClient', () => ({
  useIsClient: () => true,
}));

describe('Home Page Integration Test', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should allow a user to add a new task and see it in the list', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const titleInput = screen.getByPlaceholderText(/título da tarefa/i);
    const addButton = screen.getByRole('button', { name: /adicionar tarefa/i });
    const newTaskTitle = 'Comprar café';
    await user.type(titleInput, newTaskTitle);
    await user.click(addButton);
    const taskTitleElement = await screen.findByText(newTaskTitle);
    expect(taskTitleElement).toBeInTheDocument();
  });

  it('should allow a user to delete a task', async () => {
  const user = userEvent.setup();
  render(<Home />);

  const titleInput = screen.getByPlaceholderText(/título da tarefa/i);
  const addButton = screen.getByRole('button', { name: /adicionar tarefa/i });
  const taskToDelete = 'Tarefa para excluir';
  await user.type(titleInput, taskToDelete);
  await user.click(addButton);

  const taskElement = await screen.findByText(taskToDelete);
  const taskCard = taskElement.closest('div[class*="p-4 rounded-lg"]');
  expect(taskCard).toBeInTheDocument();

  const deleteButton = within(taskCard! as HTMLElement).getByRole('button', { name: /excluir/i });
  await user.click(deleteButton);

  expect(window.confirm).toHaveBeenCalledWith('Tem certeza que deseja excluir esta tarefa?');

  expect(screen.queryByText(taskToDelete)).not.toBeInTheDocument();
  });

  it('should allow a user to mark a task as complete', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const titleInput = screen.getByPlaceholderText(/título da tarefa/i);
    const addButton = screen.getByRole('button', { name: /adicionar tarefa/i });
    const taskToComplete = 'Passear com o cachorro';

    await user.type(titleInput, taskToComplete);
    await user.click(addButton);

    const taskElement = await screen.findByText(taskToComplete);
    
    const taskCard = taskElement.closest('div[class*="p-4 rounded-lg"]');
    const checkbox = within(taskCard! as HTMLElement).getByRole('checkbox');

    expect(taskElement).not.toHaveClass('line-through');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(taskElement).toHaveClass('line-through');
    expect(checkbox).toBeChecked();
  });

  it('should allow a user to edit a task', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const titleInput = screen.getByPlaceholderText(/título da tarefa/i);
    const addButton = screen.getByRole('button', { name: /adicionar tarefa/i });
    const originalTitle = 'Comprar pão';
    await user.type(titleInput, originalTitle);
    await user.click(addButton);

    const taskElement = await screen.findByText(originalTitle);
    const taskCard = taskElement.closest('div[class*="p-4 rounded-lg"]');
    const editButton = within(taskCard! as HTMLElement).getByRole('button', { name: /editar/i });
    await user.click(editButton);

    const editTitleInput = within(taskCard! as HTMLElement).getByDisplayValue(originalTitle);
    const saveButton = within(taskCard! as HTMLElement).getByRole('button', { name: /salvar/i });
    expect(editTitleInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    const updatedTitle = 'Comprar pão integral';
    const updatedDescription = 'Na padaria da esquina';

    const editDescriptionInput = within(taskCard! as HTMLElement).getByDisplayValue('');

    await user.clear(editTitleInput);
    await user.type(editTitleInput, updatedTitle);
    await user.type(editDescriptionInput, updatedDescription);

    await user.click(saveButton);

    expect(screen.queryByText(originalTitle)).not.toBeInTheDocument();
    expect(await screen.findByText(updatedTitle)).toBeInTheDocument();
    expect(await screen.findByText(updatedDescription)).toBeInTheDocument();
  });

});