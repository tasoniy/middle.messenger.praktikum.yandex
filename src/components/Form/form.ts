import Block from "../../utils/Block";
import template from "./form.hbs";

interface FormProps {
  inputs: Block[],
  button: Block,
  link?: Block,
  title?: string,
  formClass?: string,
  events?: {
    submitForm: (event: Event) => void;
  }
}

export class Form extends Block {
  constructor(props:FormProps) {
    super(props); 
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}