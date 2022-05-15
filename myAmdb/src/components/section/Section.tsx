import { ReactNode } from 'react';
import styles from './section.module.css';
// define type FlexDirection css
type FlexDirection =
    | 'column'
    | 'inherit'
    | '-moz-initial'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'column-reverse'
    | 'row'
    | 'row-reverse'
    | undefined;

/**
 * interface SectionProps
 * id                 - id section
 * children           - react children node
 * justifyContent     - content display
 * flexDirection      - flex direction row or column
 * width              - width section
 * padding            - padding
 * className          - custom className overrides
 * bgColor            - custom background color
 * alignItems         - aligns items
 */
interface ISectionProps {
    id?: string;
    children: ReactNode;
    justifyContent?: string;
    flexDirection?: FlexDirection;
    width?: string;
    padding?: string;
    className?: any;
    bgColor?: string;
    alignItems?: string;
}

/**
 * Section component
 * @param props interface SectionProps
 * @returns Section component
 */
export const Section = (props: ISectionProps) => (
    <div
        id={props.id}
        className={`${styles.section}  ${props.className}`}
        style={{
            alignItems: props.alignItems,
            backgroundColor: props.bgColor,
            padding: props.padding,
            justifyContent: props.justifyContent,
            flexDirection: props.flexDirection,
            width: props.width,
        }}
    >
        {props.children}
    </div>
);
