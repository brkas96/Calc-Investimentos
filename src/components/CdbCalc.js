import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CdbCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [cdiRate, setCdiRate] = useState(0);
  const [cdbPercentage, setCdbPercentage] = useState(100);
  const [years, setYears] = useState(1);
  const [result, setResult] = useState(null);

  // Função para buscar a taxa CDI via API
  useEffect(() => {
    axios.get('https://brasilapi.com.br/api/taxas/v1')
      .then(response => {
        const cdi = response.data.find(taxa => taxa.nome === 'CDI');
        setCdiRate(cdi.valor);
      })
      .catch(error => console.error("Erro ao buscar taxa CDI:", error));
  }, []);

  const calculate = () => {
    const cdiEffectiveRate = (cdiRate * (cdbPercentage / 100)) / 100;
    const finalValue = initialInvestment * Math.pow(1 + cdiEffectiveRate, years);
    setResult(finalValue.toFixed(2));
  };

  return (
    <div className="container">
      <h2 className="my-4">Cálculo de Rendimentos em CDB</h2>

      <div className="form-group">
        <label>Investimento Inicial (R$)</label>
        <input type="number" className="form-control" onChange={(e) => setInitialInvestment(e.target.value)} />
      </div>

      <div className="form-group">
        <label>% do CDI</label>
        <input type="number" className="form-control" value={cdbPercentage} onChange={(e) => setCdbPercentage(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Período (Anos)</label>
        <input type="number" className="form-control" value={years} onChange={(e) => setYears(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Taxa CDI Atual</label>
        <input type="text" className="form-control" value={cdiRate + '%'} readOnly />
      </div>

      <button className="btn btn-primary" onClick={calculate}>Calcular</button>

      {result && (
        <div className="alert alert-success mt-4">
          <h4>Valor Final: R$ {result}</h4>
        </div>
      )}
    </div>
  );
};

export default CdbCalculator;
