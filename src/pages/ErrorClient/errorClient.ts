import template  from "./errorClient.hbs"
import Block from "../../utils/Block"

class ErrorClient extends Block {
  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}

export default ErrorClient