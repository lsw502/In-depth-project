import React from 'react';
import Main from '../components/Main';
import Header from '../components/Header';
import PopularSlider from '../components/PopularSlider';

function Home() {
    return (
        <div>
            <PopularSlider />
            <Main />
        </div>
    );
}

export default Home;
