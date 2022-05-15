import { NavLink } from 'react-router-dom';
import styles from './navLinkView.module.css';

/**
 * interface NavLinkViewProps
 * children     - react children node
 * to           - destination routing
 */
interface INavLinkViewProps {
    children: React.ReactNode;
    to: string;
}

/**
 * c custom of navLink
 * @param props interface NavLinkViewProps
 * @returns Nav link view
 */
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
