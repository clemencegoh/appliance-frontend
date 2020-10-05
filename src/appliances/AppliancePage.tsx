import * as React from "react";

import {
  IconButton,
  Typography,
  useMediaQuery,
  Collapse,
  TextField,
  Select,
  MenuItem,
  Button,
  Fab,
} from "@material-ui/core";
import {
  KeyboardArrowDown as DownArrowIcon,
  KeyboardArrowUp as UpArrowIcon,
  Add as AddIcon,
} from "@material-ui/icons";

import { ApplianceDetailsModal } from "./components/ApplianceDetailsModal";
import { Appliance } from "./models/ApplianceModels";
import { daysList, monthsList } from "core/utils/datetime";

import { useStyles } from "./AppliancePageStyle";
import { splitField } from "core/utils/stringSplitter";

export interface IAppliancePageProps {}

const applianceFilterOptions = [
  "serialNumber",
  "brand",
  "model",
  "status",
  "dateBought",
];

enum currentAction {
  CREATE = "Create Appliance",
  MODIFY = "Edit Appliance",
}

export default function AppliancePage(props: IAppliancePageProps) {
  const isMobile = useMediaQuery("(max-width: 760px)");
  const classes = useStyles();

  // states
  const [action, setAction] = React.useState<currentAction>(
    currentAction.CREATE
  );
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [expandedSearch, setExpandedSearch] = React.useState<boolean>(false);
  const [filterOption, setFilterOption] = React.useState<string>(
    "serialNumber"
  );
  const [filterText, setFilterText] = React.useState<string>("");

  // variables
  const currentDate = new Date();

  return (
    <div className={`${isMobile ? classes.root : undefined}`}>
      <main className={`mobile-view`} hidden={!isMobile}>
        <header className={`header-mobile-view`}>
          <div className={`${classes.section1}`}>
            <div className={classes.dateTimeHeader}>
              <div className={classes.dateTime}>
                <Typography
                  component={"span"}
                  className={`${classes.bolded} ${classes.smallFont}`}
                >
                  {daysList[currentDate.getDay()]}
                </Typography>
                <Typography
                  component={"span"}
                  className={`${classes.smallFont}`}
                >
                  {` ${currentDate.getDay()} ${
                    monthsList[currentDate.getMonth()]
                  } ${currentDate.getFullYear()}`}
                </Typography>
              </div>
              <Typography component={"span"} className={classes.title}>
                Appliance Asset Manager
              </Typography>
            </div>
            <IconButton onClick={(e) => setExpandedSearch(!expandedSearch)}>
              {expandedSearch ? <UpArrowIcon /> : <DownArrowIcon />}
            </IconButton>
          </div>
        </header>

        <Collapse
          in={expandedSearch}
          style={{ transitionDelay: expandedSearch ? "200ms" : "0ms" }}
        >
          <div className={classes.searchWrapper}>
            <div className={classes.searchField}>
              <Select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value as string)}
                variant={"outlined"}
                margin="dense"
                className={classes.customSelect}
              >
                {applianceFilterOptions.map((item) => {
                  const fieldName = splitField(item);
                  return <MenuItem value={item}>{fieldName}</MenuItem>;
                })}
              </Select>
              <TextField
                margin="dense"
                variant="outlined"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className={classes.customTextField}
              />
            </div>
          </div>
        </Collapse>

        <body className={`${classes.mainBody}`}>
          <div className={`main-body-accordian`}></div>
          <Fab
            variant="extended"
            className={classes.fab}
            onClick={() => {
              setAction(currentAction.CREATE);
              setModalOpen(true);
            }}
          >
            <AddIcon className={classes.extendedIcon} />
            <Typography className={classes.bolded}>ADD</Typography>
          </Fab>
        </body>
      </main>

      <main className={`desktop-view`} hidden={isMobile}>
        <header className={`header-desktop-view ${classes.headerDesktop}`}>
          <div className={`title`}></div>
          <div className={`Date-and-Time-today`}></div>
          <div className={`add-new-button`}></div>
        </header>
        <body className={`body`}>
          <div className={`searchbar-single-field-only`}></div>
          <div className={`main-body-table`}></div>
        </body>
      </main>
      <ApplianceDetailsModal
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(formValues: Appliance | undefined) => {}}
        title={action}
      />
    </div>
  );
}
