import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import Form from './Form';
import { ERROR_TEXT } from '../../../../constants/constants';
import React from 'react';
import { renderWithProviders } from 'store/testUtils';

const getData = jest.fn();

describe('Form Testing ', () => {
  it('Render Form', () => {
    renderWithProviders(<Form sendData={getData} />);
    expect(screen.queryByTestId('formRegistration')).toBeInTheDocument();
  });

  it('Form button disabled', () => {
    renderWithProviders(<Form sendData={getData} />);

    const formRegistrBtn = screen.getByTestId('formRegistrBtn');
    expect(formRegistrBtn).toBeInTheDocument();
    expect(formRegistrBtn).toBeDisabled();
  });
  it('Form button enabled after change input field "Agree" value', async () => {
    renderWithProviders(<Form sendData={getData} />);

    const formRegistrBtn = screen.getByTestId('formRegistrBtn');
    const formAgree = screen.getByTestId('formAgree') as HTMLInputElement;
    expect(formAgree).toBeInTheDocument();
    expect(formAgree.checked).toEqual(false);
    fireEvent.click(formAgree);

    await waitFor(() => {
      expect(formAgree.checked).toEqual(true);
      expect(formRegistrBtn).not.toBeDisabled();
    });
  });

  describe('Testing Form submit', () => {
    it('Form submit with input data', async () => {
      renderWithProviders(<Form sendData={getData} />);

      const formRegistrBtn = screen.getByTestId('formRegistrBtn') as HTMLElement;
      const formFName = screen.queryByTestId('formFName') as HTMLElement;
      const formLName = screen.queryByTestId('formLName') as HTMLElement;
      const formDate = screen.queryByTestId('formDate') as HTMLElement;
      const formCountry = screen.queryByTestId('formCountry') as HTMLElement;
      const formFile = screen.queryByTestId('formFile') as HTMLInputElement;
      const formGender0 = screen.getByTestId('gender-0') as HTMLInputElement;
      const formGender1 = screen.getByTestId('gender-1') as HTMLInputElement;
      const formAgree = screen.getByTestId('formAgree') as HTMLInputElement;

      expect(formFName).toBeInTheDocument();
      expect(formLName).toBeInTheDocument();
      expect(formDate).toBeInTheDocument();
      expect(formCountry).toBeInTheDocument();
      expect(formFile).toBeInTheDocument();
      expect(formGender0).toBeInTheDocument();
      expect(formGender1).toBeInTheDocument();
      expect(formAgree).toBeInTheDocument();

      await act(async () => {
        fireEvent.change(formFName, { target: { value: 'John' } });
      });
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();

      await act(async () => {
        fireEvent.change(formLName, { target: { value: 'Doe' } });
      });
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();

      await act(async () => {
        fireEvent.change(formDate, { target: { value: '2022-01-01' } });
      });
      expect(screen.getByDisplayValue('2022-01-01')).toBeInTheDocument();

      await act(async () => {
        fireEvent.change(formCountry, { target: { value: 'Belarus' } });
      });

      expect(formGender0.checked).toEqual(false);
      expect(formGender1.checked).toEqual(false);
      await act(async () => {
        fireEvent.click(formGender0);
      });
      expect(formGender0.checked).toEqual(true);

      const file = new File(['picture'], 'picture.png', { type: 'image/png' });
      await act(async () => {
        fireEvent.change(formFile, { target: { files: [file] } });
      });
      const files = formFile.files;
      expect(files).toHaveLength(1);
      if (files) {
        expect(files[0]).toStrictEqual(file);
        expect(files[0].name).toBe('picture.png');
      }

      expect(formAgree.checked).toEqual(false);
      await act(async () => {
        fireEvent.click(formAgree);
      });
      expect(formAgree.checked).toEqual(true);

      expect(formRegistrBtn).not.toBeDisabled();

      await act(async () => {
        fireEvent.click(formRegistrBtn);
      });
      expect(screen.queryByText(ERROR_TEXT.agree)).toBeNull();
      expect(screen.queryByText(ERROR_TEXT.country)).toBeNull();
      expect(screen.queryByText(ERROR_TEXT.date)).toBeNull();
      expect(screen.queryByText(ERROR_TEXT.dateRange)).toBeNull();
      expect(screen.queryByText(ERROR_TEXT.empty)).toBeNull();
      expect(screen.queryByText(ERROR_TEXT.file)).toBeNull();
      expect(screen.queryByText(ERROR_TEXT.switcher)).toBeNull();
      expect(screen.queryByText(ERROR_TEXT.symbols)).toBeNull();

      await waitFor(() => expect(getData).toHaveBeenCalled());
    });

    it('Attempt form submit with empty inputs', async () => {
      renderWithProviders(<Form sendData={getData} />);

      const formRegistrBtn = screen.getByTestId('formRegistrBtn');
      const formAgree = screen.getByTestId('formAgree') as HTMLInputElement;
      expect(formAgree).toBeInTheDocument();
      expect(formAgree.checked).toEqual(false);
      await act(async () => {
        fireEvent.click(formAgree);
      });
      expect(formAgree.checked).toEqual(true);
      await act(async () => {
        fireEvent.click(formAgree);
      });
      expect(formAgree.checked).toEqual(false);
      expect(formRegistrBtn).not.toBeDisabled();
      await act(async () => {
        fireEvent.click(formRegistrBtn);
      });

      await waitFor(() => expect(getData).toHaveBeenCalledTimes(0));
    });
  });
});
