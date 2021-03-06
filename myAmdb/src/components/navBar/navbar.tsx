import styles from './navBar.module.css';

/**
 * interface NavBarProps
 * children     - react children node
 */
interface INavBarProps {
    children: React.ReactNode;
}

/**
 * Component nav bar left container
 * @param props interface NavBarProps
 * @returns Component nav bar
 */
export const NavBar = (props: INavBarProps) => {
    return <div className={styles.navBarView}>{props.children}</div>;
};
