import React from 'react';
import Logo from '../../logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/backdrop/Backdrop';
import Aux from '../../../hoc/_aux/_Aux';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close].join(' ');

    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open].join(' ');
    }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;