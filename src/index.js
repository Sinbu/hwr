import React from 'react';
import ReactDOM from 'react-dom';

import Detail from './pages/Detail';

ReactDOM.render(
        <Detail message="This is props" numOfPeople="10" />,
        document.getElementById('app')
        );
