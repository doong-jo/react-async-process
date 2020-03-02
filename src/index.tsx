import * as React from 'react';
import { render } from 'react-dom';
import Main from './pages/Main';

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

// render(<App />, document.getElementById("root"));
render(<App />, document.getElementById('root'));
