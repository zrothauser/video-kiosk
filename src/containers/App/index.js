// Dependencies
import React from 'react';
import { Route, Link } from 'react-router-dom'

// Other containers
import HomeScreen from '../HomeScreen'
import CategoryScreen from '../CategoryScreen'

const App = () => (
  <div>
    <header>
      <Link to="/">
        Clyfford Still Museum Media Channel
      </Link>
      <Link to="/">
        Video Index
      </Link>
    </header>

    <main>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/category/:id" component={CategoryScreen} />
    </main>
  </div>
)

export default App
