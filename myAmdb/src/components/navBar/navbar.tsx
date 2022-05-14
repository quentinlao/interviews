import './navBar.module.css';

interface INavBarProps {
    children: React.ReactNode;
}
export const NavBar = (props: INavBarProps) => {
    return <nav>{props.children}</nav>;
};
