import React, { useEffect, useReducer, Reducer } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import Table from '../../components/Table/Table';
import Input from '../../components/Input/Input';
import format from '../../utils/formatData';
import apiQuery from '../../utils/queries';

type PeriodTypes = 'annual' | 'quarter';
type FundamentalType = 'income' | 'balance' | 'cash' | 'ratio' | 'metric';

type StateType = {
  period: PeriodTypes;
  ticker: string;
  view: FundamentalType;
  columns: { Header: string; accessor: string; width?: number }[];
  rows?: any[];
};

type ActionType = {
  type: string;
  payload?: any;
};

// type ComponentProps = {
//   ticker: string;
// };

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'TOGGLE_PERIOD': {
      let period: PeriodTypes;
      if (state.period === 'annual') {
        period = 'quarter';
      } else if (state.period === 'quarter') {
        period = 'annual';
      } else {
        throw Error();
      }
      return { ...state, period };
    }
    case 'UPSERT_DATA': {
      const { payload } = action;
      const { rows, columns } = format.toTableFormat(payload);
      console.log('Converted Data', { rows, columns });
      return { ...state, rows, columns };
    }
    case 'UPDATE_FUNDAMENTAL': {
      return { ...state, view: action.payload };
    }
    case 'UPDATE_TICKER': {
      return { ...state, ticker: action.payload };
    }
    default:
      return state;
  }
};

const Profile = () => {
  // const routeMatch = useRouteMatch<{ ticker: string }>();
  // const { ticker } = routeMatch.params;
  const queryParams = new URLSearchParams(useLocation().search);
  const initialState: StateType = {
    period: 'annual',
    view: 'income',
    ticker: queryParams.get('ticker')?.toUpperCase() || '',
    columns: [],
    rows: [],
  };

  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(reducer, initialState);

  const { isLoading, isError, data, error } = useQuery(
    `getData/${state.ticker}/${state.period}/${state.view}`,
    () =>
      apiQuery({
        ticker: state.ticker,
        endpoint: state.view,
        isQuarter: state.period === 'quarter',
        limit: 10,
      })
  );

  useEffect(() => {
    if (data?.length) {
      console.log('Raw Data from API', data);
      dispatch({ type: 'UPSERT_DATA', payload: data });
    }
  }, [data, state.period, state.view]);

  const updateTicker = React.useCallback((val) => {
    console.log('in update ticker', val);
    dispatch({ type: 'UPDATE_TICKER', payload: val });
  }, []);

  const selectFundamental = (view: FundamentalType) => {
    dispatch({ type: 'UPDATE_FUNDAMENTAL', payload: view });
  };

  const viewAsText = {
    income: 'Income Statement',
    balance: 'Balance Sheet',
    cash: 'Cash Flow',
    ratio: 'Financial Ratios',
    metric: 'Key Metrics',
  };

  return (
    <Container>
      Profile Page
      <h1>
        {viewAsText[state.view]} - {state.period.toUpperCase()}
      </h1>
      <ButtonContainer>
        <button type="button" onClick={() => selectFundamental('income')}>
          Income Statement
        </button>
        <button type="button" onClick={() => selectFundamental('balance')}>
          Balance Sheet
        </button>
        <button type="button" onClick={() => selectFundamental('cash')}>
          Cash Flow
        </button>
        <button type="button" onClick={() => selectFundamental('ratio')}>
          Financial Ratios
        </button>
        <button type="button" onClick={() => selectFundamental('metric')}>
          Key Metrics
        </button>
      </ButtonContainer>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_PERIOD' })}>
        Toggle Time Period
      </button>
      <Input handleSubmit={updateTicker} />
      <Table columns={state.columns} data={state.rows} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export default Profile;
