import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Form } from './Form';
import { useFormContext } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
}));

describe('Form Component Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render the form component with valid inputs', () => {
    const mockOnBookNowClick = jest.fn();

    const mockValues = {
      inputValueLocation: 'Cracow',
      inputCheckboxChildrenOrAnimals: true,
      inputCheckboxTermAndConditions: true,
      inputRadioYesOrNoTravelingForWork: 'yes',
      adultCount: 2,
      childrenCount: 1,
      animalsCount: 1,
    };

    useFormContext.mockReturnValue({
      register: jest.fn(),
      watch: jest.fn((field) => mockValues[field]),
      setValue: jest.fn(),
    });

    render(
      <Form
        onBookNowClick={mockOnBookNowClick}
      />
    );

    const locationInput = screen.getByLabelText(/Where are you going today?/i);
    fireEvent.change(locationInput, { target: { value: 'Cracow' } });

    const checkboxChildrenOrAnimals = screen.getByLabelText(/Are you travelling with children or animals?/i);
    fireEvent.click(checkboxChildrenOrAnimals);
    expect(checkboxChildrenOrAnimals.checked).toBe(true);

    const adultCounter = screen.getByText(/Number of adult:/i);
    expect(adultCounter).toHaveTextContent('Number of adult: 2');
  
    const childrenCounter = screen.getByText(/Number of children:/i);
    expect(childrenCounter).toHaveTextContent('Number of children: 1');
  
    const animalsCounter = screen.getByText(/Number of animals:/i);
    expect(animalsCounter).toHaveTextContent('Number of animals: 1');

    const radioWorkYes = screen.getByLabelText(/Yes/i);
    fireEvent.click(radioWorkYes);
    expect(radioWorkYes.checked).toBe(true);

    const checkboxTerms = screen.getByLabelText(/Do you accept terms and conditions?/i);
    fireEvent.click(checkboxTerms);
    expect(checkboxTerms.checked).toBe(true);

    const bookNowButton = screen.getByRole('button', { name: /Book now/i });
    expect(bookNowButton).toBeEnabled();

    fireEvent.click(bookNowButton);

    expect(mockOnBookNowClick).toHaveBeenCalled();
  });

  test('disable the "Book Now" button when form values are empty', () => {
    const mockOnBookNowClick = jest.fn();

    const mockValues = {
      inputValueLocation: '',
      inputCheckboxChildrenOrAnimals: false,
      inputCheckboxTermAndConditions: false,
      inputRadioYesOrNoTravelingForWork: 'no',
      adultCount: 0,
      childrenCount: 0,
      animalsCount: 0,
    };

    useFormContext.mockReturnValue({
      register: jest.fn(),
      watch: jest.fn((field) => mockValues[field]),
      setValue: jest.fn(),
    });

    render(
      <Form
        onBookNowClick={mockOnBookNowClick}
      />
    );

    const locationInput = screen.getByLabelText(/Where are you going today?/i);
    fireEvent.change(locationInput, { target: { value: '' } });
  
    const checkboxChildrenOrAnimals = screen.getByLabelText(/Are you travelling with children or animals?/i);
    expect(checkboxChildrenOrAnimals.checked).toBe(false);
  
    const adultCounter = screen.getByText(/Number of adult:/i);
    expect(adultCounter).toHaveTextContent('Number of adult: 0');

    expect(screen.queryByText(/Number of children:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Number of animals:/i)).not.toBeInTheDocument();

    const radioWorkNo = screen.getByLabelText(/No/i);
    fireEvent.click(radioWorkNo);
    expect(radioWorkNo.checked).toBe(true);
  
    const checkboxTerms = screen.getByLabelText(/Do you accept terms and conditions?/i);
    expect(checkboxTerms.checked).toBe(false);
  
    const bookNowButton = screen.getByRole('button', { name: /Book now/i });
    expect(bookNowButton).toBeDisabled();
    expect(mockOnBookNowClick).not.toHaveBeenCalled();
  });
});
