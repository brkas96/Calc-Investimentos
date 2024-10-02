import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CdbCalculator from './components/CdbCalc';

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 className="text-center my-4">Site em construção</h1>

        <h1 className="text-center my-4">Ferramentas para Cálculos de Investimentos</h1>
        
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cálculo de CDB com CDI</h5>
                <p className="card-text">Calcule os rendimentos de investimentos em CDB com base na taxa CDI atual.</p>
                <Link to="/cdb" className="btn btn-primary">Calcular</Link>
              </div>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/cdb" element={<CdbCalculator />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
