import React from 'react';

import './Typography.css';
interface ITypography {
    children: React.ReactNode;
}
const Typography = (props: ITypography) => {
    return <div className={'typographyStyle'}>{props.children}</div>;
};

export default Typography;
