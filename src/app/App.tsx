import React, { Suspense } from 'react';

import { AppRouter } from './providers/router'

import { Navbar } from "@/widgets/Navbar";

function App() {
  return (
    <div className='app'>
      <Suspense fallback="Loading...">
        <Navbar />
        <div className="content-page">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;