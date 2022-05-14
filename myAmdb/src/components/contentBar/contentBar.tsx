import styles from './contentBar.module.css';

interface IContentBarProps {
    children: React.ReactNode;
}
export const ContentBar = (props: IContentBarProps) => {
    return <div className={styles.contentBarView}>{props.children}</div>;
};
