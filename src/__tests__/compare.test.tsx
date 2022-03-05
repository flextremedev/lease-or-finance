import { fireEvent, screen, waitFor } from '@testing-library/react';

import Compare from '~/pages/compare';
import { renderPage } from '~/test/renderPage';

describe('Compare page', () => {
  it('should work', async () => {
    const { routerMock } = renderPage(<Compare />, {
      pathname: '/compare',
      query: { step: 'fin' },
    });
    expect(
      screen.getByRole('heading', {
        name: 'Finanzierung',
      })
    ).toBeInTheDocument();

    fireEvent.submit(screen.getByRole('button', { name: 'Weiter' }));

    await waitFor(() => {
      expect(
        screen.getAllByText('Bitte tragen Sie einen Wert ein')
      ).toHaveLength(4);
    });

    expect(screen.getByLabelText('Kaufpreis')).toBeInTheDocument();
    fireEvent.input(screen.getByLabelText('Kaufpreis'), {
      target: {
        value: '1',
      },
    });
    expect(screen.getByLabelText('Zahlungsdauer')).toBeInTheDocument();

    expect(screen.getByLabelText('Monatliche Rate')).toBeInTheDocument();
    fireEvent.input(screen.getByLabelText('Monatliche Rate'), {
      target: {
        value: '2',
      },
    });
    expect(screen.getByLabelText('Anzahlung')).toBeInTheDocument();
    fireEvent.input(screen.getByLabelText('Anzahlung'), {
      target: {
        value: '3',
      },
    });
    expect(screen.getByLabelText('Schlusszahlung')).toBeInTheDocument();
    fireEvent.input(screen.getByLabelText('Schlusszahlung'), {
      target: {
        value: '4',
      },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Zurück' }));
    expect(routerMock.push).toHaveBeenCalledTimes(1);
    expect(routerMock.push).toHaveBeenLastCalledWith('/');

    fireEvent.submit(screen.getByRole('button', { name: 'Weiter' }));
    await waitFor(() => {
      expect(routerMock.push).toHaveBeenCalledTimes(2);
    });
    expect(routerMock.push).toHaveBeenLastCalledWith(
      '/compare?step=fin&finCarPrice=1&finEndingRate=4&finInitialPayment=3&finMonthlyRate=2&finRuntime=6',
      undefined,
      { shallow: true }
    );
  });

  it('should render null for invalid step', async () => {
    renderPage(<Compare />, {
      pathname: '/compare',
    });
    expect(
      screen.queryByRole('heading', {
        name: 'Finanzierung',
      })
    ).not.toBeInTheDocument();
  });
});
