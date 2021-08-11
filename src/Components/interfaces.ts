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
