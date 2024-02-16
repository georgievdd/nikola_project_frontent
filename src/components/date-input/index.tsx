import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import {CalendarController} from "../calendar3/hooks/useCalendar";
import TextField from "@mui/material/TextField";
import {Box, Button, Grid} from "@mui/material";
import Calendar3 from "../calendar3";
import {useEffect, useRef, useState} from "react";

export default function DateFieldValue({controller, show, setShow}:
{controller: CalendarController, show: number, setShow: (v: number) => void}) {

  const end = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (controller.selectionController.isStart) {
      end.current?.focus();
      setShow(2)
    }
  }, [controller.selectionController.isStart]);
  useEffect(() => {
    if (controller.selectionController.isActive) setShow(0)
  }, [controller.selectionController.isActive]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TextField', 'TextField']} sx={{position: 'relative', overflow: 'visible'}}>
        <Grid width='500px' display='flex' justifyContent='space-between'>

          <TextField label="Дата въезда" value={controller.selectionController.dateBegin?.getKey() || ' '}
                     onClick={e => setShow(1)}
          />
          <TextField inputRef={end} label="Дата выезда" value={controller.selectionController.dateEnd?.getKey() || ' '}
                     // disabled={Boolean(!controller.selectionController.isActive)}
          />
        </Grid>
          {!!show &&
          <Box position='absolute' sx={{top: '67px', left: '-16px'}}>
            <Calendar3 controller={controller} />
          </Box>
          }
          <Button
            variant='contained'
            color={'success'}
            size='small'
            disabled={!controller.selectionController.dateBegin}
            onClick={() => {
              controller.dataController.clear()
              controller.selectionController.clear()
              setShow(0)
            }}
          >
            Сбросить</Button>
      </DemoContainer>
    </LocalizationProvider>
  );
}