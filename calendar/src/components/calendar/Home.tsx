import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalendarView from '../widget/CalendarView/CalendarView';
import Welcome from '../widget/Welcome/Welcome';

const Home = () => {
    const { t } = useTranslation();
    return (
        <div className="container">
            <Welcome
                title={t('calendar')}
                description={t('description')}
            />
            <CalendarView />
        </div>
    );
};

export default Home;
