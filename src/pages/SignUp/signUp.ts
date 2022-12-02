import template  from "./signUp.hbs"
import Block from "../../utils/Block"
import Button from "../../components/Button"

export class SignUp extends Block {
  constructor(props: {buttonLabel: string}) {
    super(props);
  }

  protected initChildren() {
    this.children.authButton = new Button({
      label: this.props.buttonLabel,
    })

    this.children.button2 = new Button({
      label: "Click me",
    })
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.buttonLabel !== newProps.buttonLabel) {
      this.children.button.setProps({
        label:newProps.buttonLabel
      })
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
