import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';
import '@testing-library/jest-dom/extend-expect';

describe('Counter', () => {

    it('handle correctly value', () => {
        const setValue = jest.fn();
        render(<Counter 
            value={4} 
            maxValue={8} 
            setValue={setValue} 
            tag='adult' 
        />);

        const incrementButton = screen.getByText('+1');
        const decrementButton = screen.getByText('-1');
        const input = screen.getByRole('textbox');

        fireEvent.click(incrementButton);
        expect(setValue).toHaveBeenCalledWith(5);

        fireEvent.click(decrementButton);
        expect(setValue).toHaveBeenCalledWith(3);

        fireEvent.change(input, { target: { value: '5' } });
        expect(setValue).toHaveBeenCalledWith(5);

        expect(screen.getByText(/Number of adult: 4/i)).toBeInTheDocument();
    });

    it('handle case when value is 0', () => {
        const setValue = jest.fn();
        render(<Counter 
            value={0} 
            maxValue={8} 
            setValue={setValue} 
            tag='adult' 
        />);

        const incrementButton = screen.getByText('+1');
        const decrementButton = screen.getByText('-1');
        const input = screen.getByRole('textbox');

        fireEvent.click(incrementButton);
        expect(setValue).toHaveBeenCalledWith(1);

        fireEvent.click(decrementButton);
        expect(setValue).not.toHaveBeenCalledWith(0);

        fireEvent.change(input, { target: { value: '10' } });
        expect(setValue).toHaveBeenCalledWith(8);

        expect(screen.getByText(/Number of adult: 0/i)).toBeInTheDocument();
    });

    it('handle case when value is 8', () => {
        const setValue = jest.fn();
        render(<Counter 
            value={8} 
            maxValue={8} 
            setValue={setValue} 
            tag='adult' 
        />);

        const incrementButton = screen.getByText('+1');
        const decrementButton = screen.getByText('-1');
        const input = screen.getByRole('textbox');

        fireEvent.click(incrementButton);
        expect(setValue).not.toHaveBeenCalledWith(0);

        fireEvent.click(decrementButton);
        expect(setValue).toHaveBeenCalledWith(7);

        fireEvent.change(input, { target: { value: '10' } });
        expect(setValue).toHaveBeenCalledWith(8);

        expect(screen.getByText(/Number of adult: 8/i)).toBeInTheDocument();
    });

    it('handle non-numeric input value', () => {
        const setValue = jest.fn();
        render(<Counter 
            value={8} 
            maxValue={8} 
            setValue={setValue} 
            tag='adult' 
        />);

        const incrementButton = screen.getByText('+1');
        const decrementButton = screen.getByText('-1');
        const input = screen.getByRole('textbox');

        fireEvent.click(incrementButton);
        expect(setValue).not.toHaveBeenCalledWith(0);

        fireEvent.click(decrementButton);
        expect(setValue).toHaveBeenCalledWith(7);

        fireEvent.change(input, { target: { value: 'abc' } });
        expect(setValue).toHaveBeenCalledWith(8);

        expect(screen.getByText(/Number of adult: 8/i)).toBeInTheDocument();
    });

});