import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Menu} from 'antd';
import './index.less';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'app1',
            menus: [
                { name: 'app1-menu1', path: 'app1' },
                { name: 'app1-menu2', path: 'app1/menu2' }
            ]
        }
    }

    componentDidMount() {
    }

    onMenu = (menu) => {
        this.setState({
            current: menu.key
        },() => {
            // this.props.history.location.pathname = menu.key;
            this.props.history.push(menu.key);
        });
    }

    render() {
        const { menus, current } = this.state;
        const self = this;
        return (
            <div className={'main'}>
                <div className={'menu'}>
                    <Menu
                        defaultSelectedKeys={[current]}
                        mode="inline"
                        theme="dark"
                        onClick={(menu) => this.onMenu(menu)}
                    >
                        {
                            menus.map((item) => {
                                return <Menu.Item key={item.path}
                                                  // onClick={() => self.props.history.push(item.key)}
                                >
                                    {item.name}
                                </Menu.Item>
                            })
                        }
                    </Menu>
                </div>
                <div className={'content'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


export default withRouter(Main);