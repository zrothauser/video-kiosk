// Dependencies
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Component to test
import { HomeScreen } from './index';

describe('containers', () => {
	describe('HomeScreen', () => {
		let wrapper;
		const mockProps = {
			categories: [],
			isLoading: true,
			isErrored: false,
			error: false
		};

		beforeEach(() => {
			wrapper = shallow(<HomeScreen {...mockProps}/>)
		});

		it('renders without crashing', () => {
				wrapper.find('div');
		});
	});
});
