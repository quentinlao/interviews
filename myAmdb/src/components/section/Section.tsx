import { ReactNode } from 'react';
import styles from './section.module.css';
type FlexDirection = 'column' | 'inherit' | '-moz-initial' | 'initial' | 'revert' | 'unset' | 'column-reverse' | 'row' | 'row-reverse' | undefined;

type ISectionProps = {
    id?: string;
    children: ReactNode;
    justifyContent?: string;
    flexDirection?: FlexDirection;
    width?: string;
    padding?: string;
    className?: any;
    bgColor?: string;
    alignItems?: string;
};
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
