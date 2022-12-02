import Block from '../../utils/Block';
import template from './homePage.hbs';
import Button from '../../components/Button';

interface HomePageProps {
  title: string;
}

class HomePage extends Block {
  constructor(props: HomePageProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      label: 'Click me',
      events: {
        click: () => console.log('clicked'),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default HomePage;