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
  type: 'select';
  multiple?: boolean;
}
