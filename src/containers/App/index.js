// Dependencies
import React from 'react';
import { Route } from 'react-router-dom';

// Other containers
import HomeScreen from '../HomeScreen';
import CategoryScreen from '../CategoryScreen';
import VideoScreen from '../VideoScreen';

// Components
import Header from '../../components/Header';

// Styles
import './index.css';

export const App = () => (
  <div>
    <Header />
    <main className="b-main">
      <Route exact path="/" component={HomeScreen} />
      <Route path="/category/:slug" component={CategoryScreen} />
      <Route path="/video/:id" component={VideoScreen} />
    </main>
  </div>
);

export default App;
