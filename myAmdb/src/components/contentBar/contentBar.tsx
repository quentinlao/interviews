import styles from './contentBar.module.css';

/**
 * interface ContentBarProps
 * children     - react children node
 */
interface IContentBarProps {
    children: React.ReactNode;
}
/**
 * Content bar component for right container
 * @param props interface ContentBarProps
 * @returns component content bar
 */
export const ContentBar = (props: IContentBarProps) => {
    return <div className={styles.contentBarView}>{props.children}</div>;
};
