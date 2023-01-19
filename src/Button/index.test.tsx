import { render, screen } from '@testing-library/react';
import React from 'react';
import Button from './index';

describe('Button', () => {
	test('renders Button', () => {
		render(<Button>click me</Button>);
		const linkElement = screen.getByText(/click me/i);
		expect(linkElement).toBeInTheDocument();
	});
});
