import { SetStateAction } from "react"; 

export type ReactUseStateSetter<T> = React.Dispatch<SetStateAction<T>>;
