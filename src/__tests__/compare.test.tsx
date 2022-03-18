import { fireEvent, screen, waitFor } from '@testing-library/react';

import Compare from '~/pages/compare';
import { createMatchRegexSeparatedByTags } from '~/test/matchRegexSeparatedByTags';
import { renderPage } from '~/test/renderPage';

describe('Compare page', () => {
  it.each`
    case           | key       | heading      | next        | prev
    ${'financing'} | ${'fin'}  | ${'Finance'} | ${'leas'}   | ${'/'}
    ${'leasing'}   | ${'leas'} | ${'Lease'}   | ${'result'} | ${{ query: { step: 'fin' } }}
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

    fireEvent.submit(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(screen.getAllByText('Please enter a value')).toHaveLength(4);
    });

    expect(screen.getByLabelText(/vehicle price/i)).toBeInTheDocument();
    fireEvent.input(screen.getByLabelText(/vehicle price/i), {
      target: {
        value: '1',
      },
    });
    expect(screen.getByLabelText(/contract length/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/monthly payment/i)).toBeInTheDocument();
    fireEvent.input(screen.getByLabelText(/monthly payment/i), {
      target: {
        value: '2',
      },
    });
    expect(screen.getByLabelText(/initial payment/i)).toBeInTheDocument();
    fireEvent.input(screen.getByLabelText(/initial payment/i), {
      target: {
        value: '3',
      },
    });
    expect(screen.getByLabelText(/ending rate/i)).toBeInTheDocument();
    fireEvent.input(screen.getByLabelText(/ending rate/i), {
      target: {
        value: '4',
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(routerMock.push).toHaveBeenCalledTimes(1);
    expect(routerMock.push).toHaveBeenLastCalledWith(prev);

    fireEvent.submit(screen.getByRole('button', { name: /continue/i }));
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

  describe('result', () => {
    it('should work for financing winner', () => {
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

      expect(
        screen.getByText(
          createMatchRegexSeparatedByTags(
            /Mit 500€ pro Monat über eine Laufzeit von 36 Monaten sind die effektiven monatlichen Kosten bei der Variante Finanzierung 752€ günstiger als bei der Variante Leasing\./
          )
        )
      ).toBeInTheDocument();

      expect(screen.getByTestId('gesamtpreis-finanzierung').textContent).toBe(
        query.finCarPrice
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
      ).toBe('12925');
      expect(
        screen.getByTestId('kosten-für-laufzeit-leasing').textContent
      ).toBe('40000');

      expect(
        screen.getByTestId('eff-kosten-pro-monat-finanzierung').textContent
      ).toBe('359');
      expect(
        screen.getByTestId('eff-kosten-pro-monat-leasing').textContent
      ).toBe('1111');

      fireEvent.click(screen.getByRole('button', { name: 'Zurück' }));
      expect(routerMock.push).toHaveBeenLastCalledWith({
        query: { ...query, step: 'leas' },
      });

      fireEvent.click(screen.getByRole('button', { name: 'Neu starten' }));
      expect(routerMock.push).toHaveBeenLastCalledWith({
        query: { step: 'fin' },
      });
    });
    it('should work for financing winner', () => {
      const query = {
        finCarPrice: '40000',
        finEndingRate: '7000',
        finInitialPayment: '15000',
        finMonthlyRate: '500',
        finRuntime: '36',
        leasCarPrice: '40000',
        leasEndingRate: '0',
        leasInitialPayment: '3000',
        leasMonthlyRate: '250',
        leasRuntime: '36',
        step: 'result',
      };

      const { routerMock } = renderPage(<Compare />, {
        pathname: '/compare',
        query,
      });

      expect(
        screen.getByText(
          createMatchRegexSeparatedByTags(
            /Mit 250€ pro Monat über eine Laufzeit von 36 Monaten sind die effektiven monatlichen Kosten bei der Variante Leasing 26€ günstiger als bei der Variante Finanzierung\./
          )
        )
      ).toBeInTheDocument();

      expect(screen.getByTestId('gesamtpreis-finanzierung').textContent).toBe(
        query.finCarPrice
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
      ).toBe('12925');
      expect(
        screen.getByTestId('kosten-für-laufzeit-leasing').textContent
      ).toBe('12000');

      expect(
        screen.getByTestId('eff-kosten-pro-monat-finanzierung').textContent
      ).toBe('359');
      expect(
        screen.getByTestId('eff-kosten-pro-monat-leasing').textContent
      ).toBe('333');

      fireEvent.click(screen.getByRole('button', { name: 'Zurück' }));
      expect(routerMock.push).toHaveBeenLastCalledWith({
        query: { ...query, step: 'leas' },
      });

      fireEvent.click(screen.getByRole('button', { name: 'Neu starten' }));
      expect(routerMock.push).toHaveBeenLastCalledWith({
        query: { step: 'fin' },
      });
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
