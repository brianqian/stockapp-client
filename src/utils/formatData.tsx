import { IncomeStatement, BalanceSheet, CashFlow, FinRatios, KeyMetrics } from '../types/apiSchema';
import { format } from 'date-fns';

const convertCamelToTitle = (string: string): string => {
  const result = string.replace(/([A-Z])/g, ' $1');
  const final = result.charAt(0).toUpperCase() + result.slice(1);
  return final;
};

const exampleRows = [
  {
    rowName: 'Revenue',
    1999: 1000,
    2000: 3000,
    2001: 4500,
    2002: 5648,
  },
  {
    rowName: 'Cost of Revenue',
    1999: 400,
    2000: 241,
  },
];

const exampleColumns = [
  { Header: 'Metric', accessor: 'rowName' },
  { Header: '1999', accessor: '1999' },
  { Header: '2000', accessor: '2000' },
];

interface IDataRow {
  rowName: string;
  [period: string]: number | null | string;
}

interface IDateColumn {
  Header: string;
  accessor: string;
}

const formatNumber = (num: number): number => {
  if (Math.abs(num) > 500_000) {
    return num / 1_000_000;
  }
  if (Math.abs(num) < 1000) {
    return parseFloat(num.toFixed(2));
  }

  return num;
};

/**
 *
 * @description Incoming data is an array where each item is an object containing all metrics for a slice of time
 * This converts the data into rows and columns. Each column represents a slice of time (quarter/annual)
 * where each row represents a line item such as 'revenue' or 'costOfRevenue'
 *
 * The date order of the data descends from present to the past -- This needs to be reversed to generate columns
 * that have the most recent at the end of the table.
 *
 * Rows length should match # of keys in the incoming data
 * Columns length should match data length + 1 for the rowName column
 */

type APIDataShape = IncomeStatement | BalanceSheet | CashFlow | FinRatios | KeyMetrics;

export const toTableFormat = <T extends APIDataShape>(data: T[]) => {
  const dataKeys = Object.keys(data[0]);

  const columns: IDateColumn[] = data.map((periodItem) => {
    const date = new Date(periodItem.date);
    const formattedDate = format(date, 'MMM yyyy');
    return { Header: formattedDate, accessor: formattedDate };
  });

  columns.push({ Header: 'Metric', accessor: 'rowName' });

  // iterates over data by key
  const rows: IDataRow[] = dataKeys.map((dataKey) => {
    const rowName: string = convertCamelToTitle(dataKey);
    // each row object should have keys equal in length to # of columns (dates);
    const rowObject: IDataRow = { rowName };

    // iterates over data array
    data.forEach((timePeriodObj) => {
      const periodDate = new Date(timePeriodObj.date);
      const formattedPeriodDate = format(periodDate, 'MMM yyyy');

      let value = timePeriodObj[dataKey as keyof T];
      if (dataKey === 'date' || dataKey === 'filingDate') {
        value = format(new Date(value), 'YYYY');
      }
      if (typeof value === 'number') {
        value = formatNumber(value);
      }
      rowObject[formattedPeriodDate] = value;
    });

    return rowObject;
  });

  return { rows, columns: columns.reverse() };
};

// Kyle's solution ----

// export const incomeStatement = (data: IncomeStatement[]) => {
//   const rowByKey = {};
//   const columns = [];
//   data.forEach((d) => {
//     const period = format(new Date(d.date), 'MMM yyyy');
//     columns.push({
//       Header: period,
//       accessor: period,
//     });
//     Object.entries(d).forEach(([key, value]) => {
//       if (!rowByKey[key]) {
//         rowByKey[key] = {
//           rowName: convertCamelToTitle(key),
//         };
//       }
//       rowByKey[key][period] = value;
//     });
//   });
//   columns.push({ Header: 'Metric', accessor: 'rowName' });
//   return { rows: Object.values(rowByKey), columns: columns.reverse() };
// };

export default {
  toTableFormat,
};
