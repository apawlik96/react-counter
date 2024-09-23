import { render, screen, fireEvent } from '@testing-library/react';
import { Results } from './Results';
import '@testing-library/jest-dom/extend-expect';

describe('Results', () => {

    it('create the correct summary', () => {
        const setValue = jest.fn();
        render(<Results 
            location= {'Cracow'}
            totalPass= {4}
            adultCount= {2}
            childrenCount= {1}
            animalsCount= {1}
            travelingWork= {'not'}
            onBackClick={setValue}
        />);
        expect(screen.getByText(/Summary:/i)).toBeInTheDocument();
        expect(screen.getByText(/Location: Cracow/i)).toBeInTheDocument();
        expect(screen.getByText(/Travelers: 4 total \(2 adults, 1 children\) and 1 animals/i)).toBeInTheDocument();
        expect(screen.getByText(/You're not traveling for work/i)).toBeInTheDocument();

    });

    it('create summary with empty location and only adult passengers without animals', () => {
        const setValue = jest.fn();
        render(<Results 
            location= {''}
            totalPass= {2}
            adultCount= {2}
            childrenCount= {0}
            animalsCount= {0}
            travelingWork= {''}
            onBackClick={setValue}
        />);
        expect(screen.getByText(/Summary:/i)).toBeInTheDocument();
        expect(screen.getByText(/Location:/i)).toBeInTheDocument();
        expect(screen.getByText(/Travelers: 2 total \(2 adults, 0 children\) and 0 animals/i)).toBeInTheDocument();
        expect(screen.getByText(/You're traveling for work/i)).toBeInTheDocument();
    });

    it('handle button back', () => {
        const setValue = jest.fn();
        render(<Results 
            location= {''}
            totalPass= {4}
            adultCount= {2}
            childrenCount= {0}
            animalsCount= {0}
            travelingWork= {'yes'}
            onBackClick={setValue}
        />);
        const backButton = screen.getByText(/Back/i);
        fireEvent.click(backButton);
        expect(setValue).toHaveBeenCalledTimes(1);
    });
});