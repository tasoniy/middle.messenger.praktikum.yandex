import Block from "../../utils/Block";
import template from "./form.hbs";

interface FormProps {
  title: string,
  inputs: Block[],
  class?: string,
  events?: {
    submitForm: (event: Event) => void;
  }
}

export class Button extends Block {
  constructor(props:FormProps) {
    super(props); 
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  // protected componentDidUpdate(oldProps: any, newProps: any): boolean {
  //   return oldProps.prop !== newProps.prop;
  // }
}