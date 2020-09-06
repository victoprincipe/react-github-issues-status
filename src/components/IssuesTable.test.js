import React from 'react';
import {
  render,
  waitForElement,
  fireEvent,
  screen,
} from '@testing-library/react';
import IssuesTable from './IssuesTable';

describe('Test IssuesTable component', () => {
  it('Check if theme switch on button click', async () => {
    const { getByTestId, container } = render(<IssuesTable />);

    const toggleButton = await waitForElement(() =>
      getByTestId('toggle-button')
    );

    fireEvent.click(toggleButton, { button: 0 });

    expect(container.querySelector('.inverted')).toBeInTheDocument();
  });

  it('Test if show error message when fail to fetch API data', async () => {
    render(
      <IssuesTable url='https://api.github.com/repos/facebook/react/issues/asds' />
    );
    await screen.findByText('Error fetching API data!');
  });
});
