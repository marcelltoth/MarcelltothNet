import React, { useEffect } from "react";
import ReactGA from "react-ga";


import GoogleAnalytics from "react-ga";
GoogleAnalytics.initialize("UA-142224554-1");

export const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  if(window.location.hostname !== 'localhost'){
      return props => {
        useEffect(() => trackPage(props.location.pathname), [
          props.location.pathname
        ]);
    
        return <WrappedComponent {...props} />;
      };
  }
  else{
      // Disable tracking on localhost
      return WrappedComponent;
  }
};