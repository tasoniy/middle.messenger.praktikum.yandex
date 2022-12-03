import template  from "./signUp.hbs";
import Block from "../../utils/Block";
import Button from "../../components/Button";
import Form from "../../components/Form"
import Input from "../../components/Input";
import Link from "../../components/Link";

export class SignUp extends Block {
  // constructor(props: {buttonLabel: string}) {
  //   super(props);
  // }

  protected initChildren() {
    // this.children.authButton = new Button({
    //   label: this.props.buttonLabel,
    // })

    this.children.form = new Form ({
      inputs: [ 
        new Input({
          label: "Почта",
          name: "email",
          type: "email",
          placeholder: "my_email@.com",
          value:"",
        }),
        new Input({
          label: "Логин",
          name: "login",
          type: "text",
          placeholder: "mylogin",
          value:"",
        }),
        new Input({
          label: "Имя",
          name: "first_name",
          type: "text",
          placeholder: "Ivan",
          value:"",
        }),
        new Input({
          label: "Фамилия",
          name: "second_name",
          type: "text",
          placeholder: "Ivanov",
          value:"",
        }),
        new Input({
          label: "Логин",
          name: "login",
          type: "text",
          placeholder: "mylogin",
          value:"",
        }),
      ],
      button: new Button({
        label: "Зарегистрироваться",
        type: "submit"
      }),
      link: new Link({
        text: "Войти",
        route: "./signIn"
      }),
      title: "Регистрация"
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
