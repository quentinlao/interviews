import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// override useDispatch for typing TS
export const useAppDispatch = () => useDispatch<AppDispatch>();
// override useSelector for typing TS
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
