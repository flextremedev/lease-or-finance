import { fireEvent, screen, waitFor } from '@testing-library/react';

import Compare from '~/pages/compare';
import { renderPage } from '~/test/renderPage';

describe('Compare page', () => {
  it.each`
    case           | key       | heading           | next        | prev
    ${'financing'} | ${'fin'}  | ${'Finanzierung'} | ${'leas'}   | ${'/'}
    ${'leasing'}   | ${'leas'} | ${'Leasing'}      | ${'result'} | ${{ query: { step: 'fin' } }}
  `('should work for $case', async ({ key, heading, next, prev }) => {
    const { routerMock } = renderPage(<Compare />, {
      pathname: '/compare',
      query: { step: key },
    });
    expect(
      screen.getByRole('heading', {
        name: heading,
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
    expect(routerMock.push).toHaveBeenLastCalledWith(prev);

    fireEvent.submit(screen.getByRole('button', { name: 'Weiter' }));
    await waitFor(() => {
      expect(routerMock.push).toHaveBeenCalledTimes(2);
    });
    expect(routerMock.push).toHaveBeenLastCalledWith(
      {
        query: {
          [`${key}CarPrice`]: '1',
          [`${key}EndingRate`]: '4',
          [`${key}InitialPayment`]: '3',
          [`${key}MonthlyRate`]: '2',
          [`${key}Runtime`]: '6',
          step: next,
        },
      },
      undefined,
      { shallow: true }
    );
  });

  it('should work for result', () => {
    const query = {
      finCarPrice: '40000',
      finEndingRate: '7000',
      finInitialPayment: '15000',
      finMonthlyRate: '500',
      finRuntime: '36',
      leasCarPrice: '40000',
      leasEndingRate: '7000',
      leasInitialPayment: '15000',
      leasMonthlyRate: '500',
      leasRuntime: '36',
      step: 'result',
    };

    const { routerMock } = renderPage(<Compare />, {
      pathname: '/compare',
      query,
    });

    expect(screen.getByTestId('gesamtpreis-finanzierung').textContent).toBe(
      '40000'
    );
    expect(screen.getByTestId('gesamtpreis-leasing').textContent).toBe('-');

    expect(
      screen.getByTestId('restwert-nach-laufzeit-finanzierung').textContent
    ).toBe('27075');
    expect(
      screen.getByTestId('restwert-nach-laufzeit-leasing').textContent
    ).toBe('-');

    expect(
      screen.getByTestId('kosten-für-laufzeit-finanzierung').textContent
    ).toBe('40000');
    expect(screen.getByTestId('kosten-für-laufzeit-leasing').textContent).toBe(
      '40000'
    );

    expect(
      screen.getByTestId('eff-kosten-pro-monat-finanzierung').textContent
    ).toBe('359');
    expect(screen.getByTestId('eff-kosten-pro-monat-leasing').textContent).toBe(
      '1111'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Zurück' }));
    expect(routerMock.push).toHaveBeenLastCalledWith({
      query: { ...query, step: 'leas' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Neu starten' }));
    expect(routerMock.push).toHaveBeenLastCalledWith({
      query: { step: 'fin' },
    });
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
