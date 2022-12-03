import Block from "../../utils/Block";
import template from "./link.hbs";

interface LinkProps {
  text: string,
  route: string,
  class?: string,
}
export class Link extends Block {
  constructor(props: LinkProps) {
    super(props); 
  }

  render() {
    return this.compile(template, { ...this.props });
  }

  // protected componentDidUpdate(oldProps: any, newProps: any): boolean {
  //   return oldProps.prop !== newProps.prop;
  // }
}