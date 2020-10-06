import * as React from "react";
import {
  makeStyles,
  Select,
  TextField,
  MenuItem,
  Typography,
  InputLabel,
} from "@material-ui/core";

import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// utils
import DateFnsUtils from "@date-io/date-fns";
import { splitFieldCustom } from "core/utils/stringSplitter";
import { Status } from "appliances/models/ApplianceModels";

const applianceFilterOptions = [
  "serialNumber",
  "brand",
  "model",
  "status",
  "dateBought",
];

export interface IFilterSearchProps {
  onSearch?: (field: string, value: any) => void;
  onLoad?: () => void;
}

// todo: add debounce
export function FilterSearch(props: IFilterSearchProps) {
  const classes = useStyles();

  const [filterOption, setFilterOption] = React.useState<string>(
    "serialNumber"
  );
  const [filterText, setFilterText] = React.useState<string>("");
  const [filterDate, setFilterDate] = React.useState<Date | null>(new Date());
  const [filterSelect, setFilterSelect] = React.useState<Status>("Available");

  function searchAndLoad(field: string, value: any) {
    if (props.onLoad) {
      props.onLoad();
    }
    if (props.onSearch) {
      props.onSearch(field, value);
    }
  }

  function chooseInputType(option: string) {
    switch (option) {
      case "dateBought":
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              disableToolbar
              variant={"inline"}
              format="MM/dd/yyyy"
              margin="dense"
              value={filterDate}
              onChange={(date: Date | null) => {
                setFilterDate(date);
                searchAndLoad(filterOption, date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              inputVariant={"outlined"}
              InputProps={{
                classes: {
                  root: classes.customDateField,
                },
              }}
            />
          </MuiPickersUtilsProvider>
        );
      case "status":
        return (
          <Select
            value={filterSelect}
            onChange={(e) => {
              const newStatus = e.target.value as Status;
              setFilterSelect(newStatus);
              searchAndLoad(filterOption, newStatus);
            }}
            variant={"outlined"}
            margin={"dense"}
            className={classes.customSelectField}
          >
            <MenuItem value={"Available"}>Available</MenuItem>
            <MenuItem value={"Sold"}>Sold</MenuItem>
          </Select>
        );
      default:
        return (
          <TextField
            margin="dense"
            variant="outlined"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              searchAndLoad(filterOption, filterText);
            }}
            classes={{ root: classes.flex1 }}
            InputProps={{
              classes: {
                root: classes.customTextField,
              },
            }}
          />
        );
    }
  }

  return (
    <div className={classes.searchWrapper}>
      <InputLabel className={classes.filterLabel}>Filter By</InputLabel>
      <div className={classes.searchField}>
        <Select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value as string)}
          variant={"outlined"}
          margin={"dense"}
          className={classes.customSelect}
        >
          {applianceFilterOptions.map((item) => {
            const fieldName = splitFieldCustom(item);
            return <MenuItem value={item}>{fieldName}</MenuItem>;
          })}
        </Select>
        {chooseInputType(filterOption)}
      </div>
    </div>
  );
}

export const useStyles = makeStyles({
  customSelect: {
    marginTop: "4px",
    borderRadius: "4px 0 0 4px",
  },
  filterLabel: {
    margin: "1rem 0 0 2rem",
  },
  customSelectField: {
    marginTop: "4px",
    borderRadius: "0 4px 4px 0",
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  customTextField: {
    flex: 1,
    borderRadius: "0 4px 4px 0",
  },
  customDateField: {
    flex: 1,
    borderRadius: "0 4px 4px 0",
    "& input": {
      textAlign: "center",
    },
  },
  searchWrapper: {
    padding: "4px 0",
    width: "100%",
    textAlign: "left",
  },
  searchField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 2rem",
  },
});
