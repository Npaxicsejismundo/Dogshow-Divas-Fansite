import { createContext, useContext } from 'react';

/** `ready` flips to true the moment the loader starts opening. */
export const IntroContext = createContext({ ready: false });
export const useIntro = () => useContext(IntroContext);
