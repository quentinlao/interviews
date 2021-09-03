import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Calendar from '../widget/Calendar';
import Welcome from '../widget/Welcome';

const Home = () => {
    const { t } = useTranslation();
    return (
        <div className="container">
            <Welcome
                title={t('calendar')}
                description={t('description')}
            />
            <Calendar />
        </div>
    );
};

export default Home;
