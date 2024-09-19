import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';
import '@testing-library/jest-dom/extend-expect';
import { useFormContext } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
}));

describe('Form', () => {

    const mockOnBookNowClick = jest.fn();

    beforeEach(() => {
        useFormContext.mockReturnValue({
          register: jest.fn(),
          watch: jest.fn((field) => {
            const values = {
              inputValueLocation: '',
              inputCheckboxChildrenOrAnimals: false,
              inputCheckboxTermAndConditions: false,
              adultCount: 0,
              childrenCount: 0,
              animalsCount: 0,
            };
            return values[field];
          }),
          setValue: jest.fn(),
        });
      });
  

    
    it('Create paragraph', () => {
        render(<Form onBookNowClick={mockOnBookNowClick} />);
        expect(screen.getByText(/Total passengers: 0/i)).toBeInTheDocument();
    });

    
    it("Create component counter adult", () => {
        useFormContext.mockReturnValue({
            register: jest.fn(),
            watch: jest.fn((field) => {
                if (field === 'inputCheckboxChildrenOrAnimals') {
                  return true;
                }
              }),
            setValue: jest.fn(), 
        });
        render(<Form onBookNowClick={mockOnBookNowClick} />);

        const counterElement = screen.getByText(/adult/i);
        expect(counterElement).toBeInTheDocument();
    })

    it("Create component counter animal/child", () => {
        render(<Form onBookNowClick={mockOnBookNowClick} />);

        const counterChildren = screen.getByLabelText(/children/i);
        const counterAnimals = screen.getByLabelText(/animals/i);
    
        expect(counterChildren).toBeInTheDocument();
        expect(counterAnimals).toBeInTheDocument()
    })

    it("Create input location", () => {
        const mockSetValue = jest.fn();
        useFormContext.mockReturnValue({
            register: jest.fn(),
            watch: jest.fn(),
            setValue: mockSetValue,
        });
        render(<Form onBookNowClick={mockOnBookNowClick} />);

        const locationInput = screen.getByLabelText(/where are you going today?/i);
        fireEvent.change(locationInput, { target: { value: 'Cracow' } });

        expect(locationInput).toBeInTheDocument();
        expect(locationInput.value).toBe('Cracow');
        expect(mockSetValue).toHaveBeenCalled();
    })

    it("Create input traveling for work", () => {
        render(<Form onBookNowClick={mockOnBookNowClick} />);

        const labelElement = screen.getByText(/are you traveling for work/i);
        expect(labelElement).toBeInTheDocument();
    
        const yesRadio = screen.getByLabelText(/yes/i);
        const noRadio = screen.getByLabelText(/no/i);
    
        expect(yesRadio).toBeInTheDocument();
        expect(noRadio).toBeInTheDocument();
    })

    it("Create input terms abd conditions", () => {
        render(<Form onBookNowClick={mockOnBookNowClick} />);
        const termsAndConditionsInput = screen.getByLabelText(/Do you accept terms and conditions?/i);
        expect(termsAndConditionsInput).toBeInTheDocument();
    })

    it("Create button book now", () => {
        useFormContext.mockReturnValue({
            register: jest.fn(),
            watch: jest.fn((field) => {
                if (field === 'inputCheckboxTermAndConditions') {
                    return true;
                }
                return false;
            }),
            setValue: jest.fn(),
        });
        render(<Form onBookNowClick={mockOnBookNowClick} />);

        const bookNowButton = screen.getByRole('button', { name: /book now/i });
        fireEvent.click(bookNowButton);

        expect(bookNowButton).not.toBeDisabled();
        expect(bookNowButton).toBeInTheDocument();
        expect(mockOnBookNowClick).toHaveBeenCalled();
    })
});