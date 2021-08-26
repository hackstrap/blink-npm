export interface ActionInterface {
  type: string;
  payload?: any;
}

export interface OptionInterface {
  Header: string;
  accessor: string;
}

// RevenueTable interfaces
export interface TableDataInterface {
  currency?: string;
  fields: OptionInterface[];
  data: YearDataInterface;
}

export interface YearDataInterface {
  [key: string]: (string | number | undefined)[][];
}

export interface TablePropsInterface {
  data: TableDataInterface;
  changeHandler: (data: any) => void;
  currentYear: string;
  setCurrentYear: Function;
}

export interface RevenueTableRowInterface {
  [key: string]: string | number | React.ReactNode;
}

export interface NoteDataInterface {
  _id?: string;
  email_status: boolean;
  investor_view: boolean;
  last_emailed: string;
  last_updated: string;
  month: number;
  note_data: object[];
  note_name: string;
  startup_id: string;
  year: number;
}

export interface Form_Field {
  label: string;
  name: string;
  placeholder?: string;
  infoText?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface SelectField_Interface extends Form_Field {
  options: string[];
  type: "select";
  multiple?: boolean;
}

export interface InvestmentSummaryInterface {
  agg_net_irr_data: {
    [key: string]: number[];
  };
  aggregate_multiple: number;
  aggregate_net_irr: number;
  current_total_investment_value_bool: boolean;
  agg_net_irr_bool: boolean;
  current_total_investment_value: number;
  organization: string;
  startups_by: [
    {
      data: number[];
      filter: string;
      labels: string[];
    }
  ];
  total_investment: string;
  total_startups: string;
  total_transactions: {
    all_transactions: number;
    last_three_months: number;
    this_year: number;
  };
}

export interface ValuationDataInterface {
  _id: string;
  startup_id: string;
  valuation: number;
  valuation_chart: {
    min: number;
    max: number;
    name: string;
  }[];
  valuation_data: {
    [key: string]: number[];
  };
  valuation_bool: boolean;
}

export interface PortfolioDataInterface {
  current_investment_value: string;
  current_investment_value_bool: boolean;
  investment_time: {
    in_days: number;
    in_year_month_day: number[];
    startup_total_number_of_transactions: number;
  };
  startup_id: string;
  startup_multiple: number;
  startup_net_irr_bool: boolean;
  startup_net_irr_data: {
    [key: string]: (number | undefined)[];
  };
  total_money_invested: number;
}
