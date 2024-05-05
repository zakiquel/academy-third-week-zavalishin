import React, { Suspense } from 'react';

import './styles/index.scss'
import { AppRouter } from './providers/router'

function App() {
  return (
    <div className='app'>
      <Suspense fallback="Loading...">
        <div className="content-page">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;