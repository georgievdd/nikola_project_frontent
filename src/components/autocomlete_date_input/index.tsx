import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useEffect, useState} from "react";
import {Stack} from "@mui/material";

export default function AutocompleteDateInput({controller}: {controller: AutocompleteDateInputController}) {
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                id="free-solo-demo"
                value={controller.options[0]}
                onChange={(e, v) => {
                    controller.onChange(v)
                    return v
                }}
                options={controller.options}
                renderInput={(params) => <TextField {...params} label="час выезда" />}
            />
        </Stack>
    );
}
export interface AutocompleteDateInputController {
    options: string[],
    value: string,
    onChange: (v: any) => void,
}

export function useAutocompleteDateInputController(options: string[]) {
    const [value, setValue] = useState<string>('')
    const onChange = (value: string) => setValue(value)
    useEffect(() => {
        if (options.length > 0) {
            setValue(options[0])
        }
    }, [options]);
    return {
        value,
        onChange,
        options
    }
}