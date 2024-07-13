import { useState } from "react";


export const useValue = <T>(defaultValue: any = null) => {
    const [value, setValue] = useState<T>(defaultValue);
    return {
        get: () => value,
        set: (v: T) => setValue(v)
    }
}