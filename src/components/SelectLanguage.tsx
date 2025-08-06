import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { Dispatch, useEffect, useState } from 'react';
import { rootRequest } from 'utils/request/rootRequest';

type SelectEvent =
  | React.ChangeEvent<
      Omit<HTMLInputElement, 'value'> & {
        value: string;
      }
    >
  | (Event & {
      target: {
        value: string;
        name: string;
      };
    });
export const SelectLanguage = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: Dispatch<React.SetStateAction<string>>;
}) => {
  const [languages, setLanguages] = useState<string[]>([]);
  useEffect(() => {
    rootRequest.getLanguages().then((res) => {
      console.log({ resLang: res });
      if (res) setLanguages(res);
    });
  }, []);

  const handleChange = (e: SelectEvent) => {
    e.preventDefault();
    if (e.target) {
      setLanguage(e.target.value);
    }
  };

  return (
    <>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
