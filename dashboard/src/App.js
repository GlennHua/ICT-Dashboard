import React from 'react';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Bar } from './Components/SharedComponent/SharedBarContent';
import PageLayout from "./views/page-layout/layout"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*'>
          <Route element={<PageLayout />} />
          <Route path="*" element={<PageLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;