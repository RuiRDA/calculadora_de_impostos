import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import {
    calculateSocialSecurityImpact,
    calculateIRSImpact,
    formatCurrency,
    formatPercentage
} from './calculations';

function App() {
    const [serviceValue, setServiceValue] = useState('');
    const [annualRevenue, setAnnualRevenue] = useState('');
    const [isFirstYear, setIsFirstYear] = useState(false);
    const [hasWithholding, setHasWithholding] = useState(false);
    const [results, setResults] = useState(null);
    const resultsRef = useRef(null);

    useEffect(() => {
        if (results && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [results]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceNum = parseFloat(serviceValue) || 0;
        const revenueNum = parseFloat(annualRevenue) || 0;

        if (serviceNum <= 0) {
            alert('Por favor, insira um valor de serviço válido.');
            return;
        }

        const ssResult = calculateSocialSecurityImpact(serviceNum, isFirstYear);
        const irsResult = calculateIRSImpact(serviceNum, revenueNum);
        const withholdingAmount = hasWithholding ? serviceNum * 0.25 : 0;

        // New calculations
        const ssReduced = ssResult.impact * 0.75; // (-25% SS)
        const profitPreContribution = serviceNum - ssReduced; // Profit pre contribution
        const contributionValue = profitPreContribution * 0.1; // Contribution value
        const profitPostContribution = profitPreContribution - contributionValue; // Profit post contribution

        const totalDeductions = ssResult.impact + irsResult.impact + withholdingAmount;
        const netProfit = serviceNum - totalDeductions;

        setResults({
            serviceAmount: serviceNum,
            ssImpact: ssResult.impact,
            ssDetails: ssResult.details,
            irsImpact: irsResult.impact,
            irsDetails: irsResult.details,
            withholdingAmount,
            netProfit,
            profitPercentage: netProfit / serviceNum,
            ssReduced,
            profitPreContribution,
            contributionValue,
            profitPostContribution,
        });
    };

    return (
        <div className="container">
            <div className="header">
                <h1>💰 Calculadora de Lucro</h1>
                <p>Quanto vou ganhar com este serviço?</p>
            </div>

            <div className="form-section">
                <form id="serviceForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="serviceValue">💼 Valor do Serviço (sem IVA) (€)</label>
                        <input
                            type="number"
                            id="serviceValue"
                            min="0"
                            step="0.01"
                            placeholder="Ex: 500"
                            required
                            value={serviceValue}
                            onChange={(e) => setServiceValue(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="annualRevenue">📈 Rendimento anual estimado (sem este serviço) (€)</label>
                        <input
                            type="number"
                            id="annualRevenue"
                            min="0"
                            step="0.01"
                            placeholder="Ex: 24000"
                            required
                            value={annualRevenue}
                            onChange={(e) => setAnnualRevenue(e.target.value)}
                        />
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="firstYear"
                            checked={isFirstYear}
                            onChange={(e) => setIsFirstYear(e.target.checked)}
                        />
                        <label htmlFor="firstYear">É o primeiro ano de atividade (isento de SS)</label>
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="withholding"
                            checked={hasWithholding}
                            onChange={(e) => setHasWithholding(e.target.checked)}
                        />
                        <label htmlFor="withholding">Cliente faz retenção na fonte (25%)</label>
                    </div>

                    <button type="submit" className="btn-calculate">Calcular Lucro Real</button>
                </form>
            </div>

            {results && (
                <div ref={resultsRef} className="results show" id="results">
                    <div className="profit-summary">
                        <h2>Lucro Líquido</h2>
                        <div className="profit-value">{formatCurrency(results.netProfit)}</div>
                        <div className="profit-subtitle">É isto que vai realmente ganhar</div>
                    </div>

                    <div className="breakdown-card">
                        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>📋 Breakdown Detalhado</h3>
                        <div className="breakdown-item">
                            <span>💼 Valor do serviço (sem IVA)</span>
                            <span className="value-positive">{formatCurrency(results.serviceAmount)}</span>
                        </div>
                        <div className="breakdown-item">
                            <span>🏛️ Segurança Social</span>
                            <span className="value-negative">-{formatCurrency(results.ssImpact)}</span>
                        </div>
                        <div className="breakdown-item">
                            <span>📊 IRS</span>
                            <span className="value-negative">-{formatCurrency(results.irsImpact)}</span>
                        </div>
                        {hasWithholding && (
                            <div className="breakdown-item">
                                <span>⛔ Retenção na fonte</span>
                                <span className="value-negative">-{formatCurrency(results.withholdingAmount)}</span>
                            </div>
                        )}
                        <div className="breakdown-item total">
                            <span>💰 LUCRO LÍQUIDO</span>
                            <span className="value-positive">{formatCurrency(results.netProfit)}</span>
                        </div>
                    </div>

                    <div className="highlight-box">
                        <strong>💡 Resumo:</strong> De cada {formatCurrency(results.serviceAmount)} que facturar,
                        ficará com {formatCurrency(results.netProfit)} líquidos
                        ({formatPercentage(results.profitPercentage)} do valor original)
                    </div>

                    <div className="breakdown-card">
                        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>📊 Cálculos Adicionais</h3>
                        <div className="breakdown-item">
                            <span>🏛️ Segurança Social (-25% SS)</span>
                            <span className="value-negative">{formatCurrency(results.ssReduced)}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                            Valor da SS com desconto de 25% (SS × 0.75)
                        </div>
                        <div className="breakdown-item">
                            <span>📈 Lucro Pré Dízimo</span>
                            <span className="value-positive">{formatCurrency(results.profitPreContribution)}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                            Valor bruto - SS reduzida
                        </div>
                        <div className="breakdown-item">
                            <span>💼 Valor do Dízimo</span>
                            <span className="value-negative">{formatCurrency(results.contributionValue)}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                            (Valor bruto - SS reduzida) × 10%
                        </div>
                        <div className="breakdown-item total">
                            <span>💰 Lucro Pós Dízimo</span>
                            <span className="value-positive">{formatCurrency(results.profitPostContribution)}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                            Valor bruto - SS reduzida - Valor do dízimo
                        </div>
                    </div>

                    <div className="breakdown-card">
                        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>🔍 Como são calculados os impostos?</h3>
                        <div>
                            <div className="breakdown-item">
                                <span><strong>Segurança Social:</strong></span>
                                <span></span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                                {results.ssDetails}<br />
                                <em>A SS é calculada sobre o rendimento do trimestre, por isso este serviço só impacta o próximo trimestre.</em>
                            </div>
                            <div className="breakdown-item">
                                <span><strong>IRS:</strong></span>
                                <span></span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                                {results.irsDetails}<br />
                                <em>Impacto no escalão de IRS anual total.</em>
                            </div>
                            {hasWithholding && (
                                <>
                                    <div className="breakdown-item">
                                        <span><strong>Retenção na Fonte:</strong></span>
                                        <span></span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                                        25% do valor do serviço retido pelo cliente.<br />
                                        <em>Valor descontado imediatamente na fatura.</em>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="info-note">
                        <strong>⚠️ Importante:</strong> Este cálculo é uma estimativa baseada na legislação de 2024.
                        Os valores de SS dependem do rendimento trimestral e o IRS do rendimento anual total.
                        Consulte sempre um contabilista para situações específicas.
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
