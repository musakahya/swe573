// Initiates a React context for storing user information across the application.

import React from 'react';

const userContext = React.createContext({ user: {} }); // Create a context object

export default userContext; // Export it so it can be used by other Components
