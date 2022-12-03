import Block from "../../utils/Block";
// import { validation } from "../../utils/validation";
import template from "./input.hbs";

interface InputProps {
  label: string,
  name: string,
  type: string,
  placeholder?: string,
  value?: string,
  events?: {
    blur?: (e: Event) => void;
    focus?: (e: Event) => void;
  }
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
    // const events = {

    // }
  }

  // onBlur(event: Event) {
    
  // }

  render() {
    return this.compile(template, { ...this.props });
  }
}
