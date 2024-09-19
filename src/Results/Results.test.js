import { render, screen, fireEvent } from '@testing-library/react';
import { Results } from './Results';
import '@testing-library/jest-dom/extend-expect';

describe('Results', () => {

    const defaultProps = {
        location: 'Cracow',
        totalPass: 4,
        adultCount: 2,
        childrenCount: 1,
        animalsCount: 1,
        travelingWork: 'not',
        onBackClick: jest.fn(),
    };

    it('Create container summary', () => {
        render(<Results {...defaultProps} />);
        expect(screen.getByText(/Summary:/i)).toBeInTheDocument();
        expect(screen.getByText(/Location: Cracow/i)).toBeInTheDocument();
        expect(screen.getByText(/Travelers: 4 total \(2 adults, 1 children\) and 1 animals/i)).toBeInTheDocument();
        expect(screen.getByText(/You're not traveling for work/i)).toBeInTheDocument();
    });


    it('Create button back', () => {
        render(<Results {...defaultProps} />);
        const backButton = screen.getByText(/Back/i);
        fireEvent.click(backButton);
        expect(defaultProps.onBackClick).toHaveBeenCalledTimes(1);
    });
});