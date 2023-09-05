import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlobalFilter } from '../GlobalFilter';
import { useAsyncDebounce } from 'react-table';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-table')

describe('GlobalFilter', () => {

  it('should display a search input and a tooltip', () => {
    const filter = '';
    const setFilter = jest.fn();
    const onChange = jest.fn();
    useAsyncDebounce.mockImplementation(()=>{ });
    render(<GlobalFilter filter={filter} setFilter={setFilter} />);

    const input = screen.getByRole('textbox');
    const tooltip = screen.getByLabelText('Enter any text to globally filter');

    expect(input).toBeInTheDocument();
    expect(tooltip).toBeInTheDocument();
  });

  it('should update filter value when user types in search input', () => {
    const filter = '';
    const setFilter = jest.fn().mockReturnValue('test');
    const onChange = jest.fn().mockReturnValue('test')
    useAsyncDebounce.mockImplementation(()=>{setFilter});
    render(<GlobalFilter filter={filter} setFilter={setFilter} />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'COMPSCI');
    expect(screen.getByRole('textbox').value).toBe('COMPSCI');
  });
});

// can not run the onChange function