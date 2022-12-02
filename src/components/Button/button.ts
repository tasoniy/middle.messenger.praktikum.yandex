import Block from "../../utils/Block";
import template from "./button.hbs";

interface ButtonProps {
  label: string,
  type?: string,
  class?: string,
  events?: {
    click?: () => void;
  }
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props); 
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  // protected componentDidUpdate(oldProps: any, newProps: any): boolean {
  //   return oldProps.prop !== newProps.prop;
  // }
}


