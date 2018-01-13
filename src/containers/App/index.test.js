// Dependencies
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';

// Component to test
import { App } from './index';

describe('containers', () => {
	describe('App', () => {
		it('renders without crashing', () => {
				shallow(<App />);
		});
	});
});
