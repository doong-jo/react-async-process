import * as React from 'react';
import { render } from 'react-dom';
import Main from './pages/Main';
import MainContext from './contexts/Main';

function App() {
  return (
    <div>
      <MainContext>
        <Main />
      </MainContext>
    </div>
  );
}

// render(<App />, document.getElementById("root"));
render(<App />, document.getElementById('root'));
