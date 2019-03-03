import * as React from 'react';
import { Redirect } from 'react-router';

export const NotFoundPage : React.FC = 
    () => <Redirect to="/" />;