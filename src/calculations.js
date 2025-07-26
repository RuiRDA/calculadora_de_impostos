const SS_RATE = 0.214;
const MIN_SS_CONTRIBUTION = 20.00;
const MAX_SS_BASE = 6111.12;
const IRS_COEFFICIENT_SERVICES = 0.75;

const IRS_BRACKETS = [
    { min: 0, max: 7703, rate: 0.1325, deduction: 0 },
    { min: 7703, max: 11623, rate: 0.18, deduction: 365.89 },
    { min: 11623, max: 16472, rate: 0.23, deduction: 947.04 },
    { min: 16472, max: 21321, rate: 0.26, deduction: 1441.17 },
    { min: 21321, max: 27146, rate: 0.3275, deduction: 2873.34 },
    { min: 27146, max: 39791, rate: 0.37, deduction: 4026.98 },
    { min: 39791, max: 51997, rate: 0.435, deduction: 6613.39 },
    { min: 51997, max: 81199, rate: 0.45, deduction: 7393.36 },
    { min: 81199, max: Infinity, rate: 0.48, deduction: 9829.33 }
];

export function calculateSocialSecurityImpact(serviceValue, isFirstYear) {
    if (isFirstYear) {
        return {
            impact: 0,
            details: "Isento no primeiro ano de atividade."
        };
    }

    const futureQuarterRevenue = serviceValue;
    const baseIncidence = Math.min((futureQuarterRevenue * 0.70) / 3, MAX_SS_BASE);
    const monthlyContribution = Math.max(baseIncidence * SS_RATE, MIN_SS_CONTRIBUTION);
    
    const totalImpact = monthlyContribution * 3;

    return {
        impact: totalImpact,
        details: `Este serviço irá gerar uma contribuição de ${formatCurrency(monthlyContribution)}/mês durante os próximos 3 meses (base de incidência: ${formatCurrency(baseIncidence)}).`
    };
}

export function calculateIRSImpact(serviceValue, annualRevenue) {
    const calculateIRSonAmount = (revenue) => {
        const collectableIncome = revenue * IRS_COEFFICIENT_SERVICES;
        const bracket = IRS_BRACKETS.find(b => collectableIncome >= b.min && collectableIncome < b.max);
        if (!bracket) return 0;
        return Math.max((collectableIncome * bracket.rate) - bracket.deduction, 0);
    };

    const currentIRS = calculateIRSonAmount(annualRevenue);
    const newIRS = calculateIRSonAmount(annualRevenue + serviceValue);
    
    const impact = newIRS - currentIRS;
    const newCollectableIncome = (annualRevenue + serviceValue) * IRS_COEFFICIENT_SERVICES;
    const newBracket = IRS_BRACKETS.find(b => newCollectableIncome >= b.min && newCollectableIncome < b.max);

    return {
        impact: Math.max(impact, 0),
        details: `O seu rendimento coletável anual passará para ${formatCurrency(newCollectableIncome)}, aplicando-se uma taxa de ${formatPercentage(newBracket.rate)}.`
    };
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR'
    }).format(value);
}

export function formatPercentage(value) {
    return (value * 100).toFixed(1) + '%';
}