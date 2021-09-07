import React from 'react';

import './Typography.css';

/**
 *
 */
interface ITypography {
    children: React.ReactNode;
}
/**
 *
 * @param props
 * @returns
 */
const Typography = (props: ITypography) => {
    return <div className={'typographyStyle'}>{props.children}</div>;
};

export default Typography;
