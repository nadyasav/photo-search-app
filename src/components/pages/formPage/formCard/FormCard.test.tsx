import { render, screen } from '@testing-library/react';
import React from 'react';
import FormCard from './FormCard';

const formData = {
  firstName: '<firstName>',
  lastName: '<lastName>',
  dateOfBirth: '<dateOfBirth>',
  country: '<country>',
  file: '<file>',
  gender: '<gender>',
  agree: '<agree>',
};

describe('Testing FormCard ', () => {
  it('renders FormCard', () => {
    const formCard = render(<FormCard data={formData} index={0} />);
    expect(formCard).toMatchSnapshot();
  });
});
