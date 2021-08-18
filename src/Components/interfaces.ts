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
  [key: string]: (string | number)[][];
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
}

export interface PortfolioDataInterface {
  investor_id: string;
  investment_summary: InvestmentSummaryInterface[];
  startup_summary: {
    startup_id: string;
    total_money_invested: number;
    current_investment_value: number;
    multiple: number;
    startup_net_irr_data: {
      [key: string]: number[];
    };
    investment_time: {
      in_months: number[];
      in_days: number;
      in_years: number;
    };
    organization: {
      fees: number;
      carry: number;
      one_time_fees: number;
      name: string;
      discount: number;
      valuation_cap: number;
      entry_valuation: number;
    }[];
  };
}
