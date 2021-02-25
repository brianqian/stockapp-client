const root = 'https://financialmodelingprep.com';
const apiKey = process.env.REACT_APP_API_KEY;

const endpoints: Record<string, string> = {
  income: 'api/v3/income-statement',
  balance: 'api/v3/balance-sheet-statement',
  cash: 'api/v3/cash-flow-statement',
  ratio: 'api/v3/ratios',
  metric: 'api/v3/key-metrics',
};

interface queryParams {
  ticker: string;
  endpoint: string;
  limit?: number;
  isQuarter?: boolean;
}

const query = async (params: queryParams) => {
  const { ticker, endpoint, limit = 10, isQuarter } = params;
  if (!ticker) return [];

  const parsedEndpoint = endpoints[endpoint];
  const resp = await fetch(
    `${root}/${parsedEndpoint}/${ticker}?limit=${limit}${
      isQuarter ? '&period=quarter' : ''
    }&apikey=${apiKey}`
  );
  console.log(resp);
  const data = await resp.json();
  console.log({ data });
  return data;
};

export default query;
