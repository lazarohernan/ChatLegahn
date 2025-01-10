import { useContext } from 'react';
import { WalkthroughContext } from '../WalkthroughContext';

export const useWalkthrough = () => useContext(WalkthroughContext);
