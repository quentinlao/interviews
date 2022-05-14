import { NavLink } from 'react-router-dom';
import styles from './navLinkView.module.css';

interface INavLinkViewProps {
    children: React.ReactNode;
    to: string;
}
export const NavLinkView = (props: INavLinkViewProps) => {
    return (
        <NavLink
            to={props.to}
            className={(state) => {
                return state.isActive ? styles.navigationActive : styles.navigation;
            }}
        >
            {props.children}
        </NavLink>
    );
};
