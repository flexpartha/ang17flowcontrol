export interface FormField {
  type: string;
  name: string;
  inputType?: string;
  label: string;
  value: string;
  isDisable?: boolean;
  Default?: string;
  options?: Option[];
  checked?: string;
}

interface Option {
  label: string;
  value: string;
}
