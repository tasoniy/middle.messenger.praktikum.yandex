import template  from "./signIn.hbs";
import Block from "../../utils/Block";
import Button from "../../components/Button";
import Form from "../../components/Form"
import Input from "../../components/Input";
import Link from "../../components/Link";

export class SignIn extends Block {
  protected initChildren() {

    this.children.form = new Form ({
      inputs: [ 
        new Input({
          label: "Логин",
          name: "login",
          type: "text",
          placeholder: "mylogin",
          value:"",
        }),

        new Input({
          label: "Пароль",
          name: "password",
          type: "password",
          placeholder: "password",
          value:"",
        }),
      ],
      button: new Button({
        label: "Авторизоваться",
        type: "submit"
      }),
      link: new Link({
        text: "Нет аккаунта?",
        route: "./signUp"
      }),
      title: "Вход",
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