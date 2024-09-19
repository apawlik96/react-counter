import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';
import '@testing-library/jest-dom/extend-expect';

describe('Counter', () => {

    const defaultProps = {
        value: 0,
        maxValue: 8, 
        setValue: jest.fn(),
        tag: 'adult'
    };

    it('Create increment button', () => {
        render(<Counter {...defaultProps} />);
        const incrementButton = screen.getByText('+1');
        fireEvent.click(incrementButton);
        expect(defaultProps.setValue).toHaveBeenCalledWith(1);
    });


    it('Create decrement button', () => {
        render(<Counter {...defaultProps} />);
        const decrementButton = screen.getByText('-1');
        fireEvent.click(decrementButton);
        expect(defaultProps.setValue).not.toHaveBeenCalled();
    });


    it('Create input change', () => {
        render(<Counter {...defaultProps} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '5' } });
        expect(defaultProps.setValue).toHaveBeenCalledWith(5);
    });


    it('Create paragraph', () => {
        render(<Counter {...defaultProps} />);
        expect(screen.getByText(/Number of adult: 0/i)).toBeInTheDocument();
    });
});