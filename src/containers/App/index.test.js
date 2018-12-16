// Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Component to test
import { App } from './index';

describe('containers', () => {
  describe('App', () => {
    it('renders without crashing', () => {
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

      shallow(<App {...mockProps} />);
    });
  });
});
