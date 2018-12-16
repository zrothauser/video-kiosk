import React from 'react';
import { shallow } from 'enzyme';

import { App } from './index';

describe('containers', () => {
  describe('App', () => {
    const mockProps = {
      fetchAppSettings: jest.fn(),
      fetchAppData: jest.fn(),
      isVideoIndexOpen: true,
      toggleVideoIndex: jest.fn(),
      closeVideoIndex: jest.fn(),
      showHeader: true,
      setSlug: 'media-channel',
      defaultSet: 'media-channel',
      homeURL: 'http://video.clyffordstillmuseum.org',
    };

    it('renders without crashing', () => {
      shallow(<App {...mockProps} />);
    });

    it('renders correctly', () => {
      const AppComponent = shallow(<App {...mockProps} />);

      expect(AppComponent).toMatchSnapshot();
    });
  });
});
