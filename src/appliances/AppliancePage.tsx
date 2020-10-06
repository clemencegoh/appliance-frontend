import * as React from "react";

// Components
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
  Table,
} from "@material-ui/core";
import { FilterList as FilterIcon, Add as AddIcon } from "@material-ui/icons";
import { CustomTable } from "./components/CustomTable";
import { ApplianceDetailsModal } from "./components/ApplianceDetailsModal";
import { Appliance } from "./models/ApplianceModels";
import { FilterSearch } from "./components/FilterSearch";
import { ListTile } from "./components/ListTile";

// utils
import { daysList, monthsList } from "core/utils/datetime";
import { api } from "core/services/apiService";

// styles
import {
  useCommonStyles,
  useDesktopStyles,
  useMobileStyles,
} from "./AppliancePageStyle";

export interface IAppliancePageProps {}

enum currentAction {
  CREATE = "Create Appliance",
  MODIFY = "Edit Appliance",
}

export default function AppliancePage(props: IAppliancePageProps) {
  const isMobile = useMediaQuery("(max-width: 760px)");

  const classes = useCommonStyles();
  const mobileClasses = useMobileStyles();
  const desktopClasses = useDesktopStyles();

  // states
  const [action, setAction] = React.useState<currentAction>(
    currentAction.CREATE
  );
  const [initialModalData, setInitialModalData] = React.useState<
    Appliance | undefined
  >();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [expandedSearch, setExpandedSearch] = React.useState<boolean>(false);

  // data
  const [data, setData] = React.useState<Appliance[]>();
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  React.useEffect(() => {
    api.get<Appliance[]>("all").then((resp) => {
      setData(resp.data);
    });
  }, []);

  // variables
  const currentDate = new Date();

  return (
    <div className={`${isMobile ? classes.root : undefined}`}>
      {/**
       * Mobile View
       */}
      <main className={mobileClasses.mobileMain} hidden={!isMobile}>
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
              <FilterIcon />
            </IconButton>
          </div>
        </header>

        <Collapse
          in={expandedSearch}
          style={{ transitionDelay: expandedSearch ? "200ms" : "0ms" }}
        >
          <FilterSearch />
        </Collapse>

        <div className={`${mobileClasses.mobileBody}`}>
          <div className={mobileClasses.listTile}>
            {data?.map((item) => (
              <ListTile data={item} />
            ))}
          </div>
          <Fab
            variant="extended"
            className={classes.fab}
            onClick={() => {
              setAction(currentAction.CREATE);
              setInitialModalData(undefined);
              setModalOpen(true);
            }}
          >
            <AddIcon className={classes.extendedIcon} />
            <Typography className={classes.bolded}>ADD</Typography>
          </Fab>
        </div>
      </main>

      {/**
       * Desktop View
       */}
      <main className={`desktop-view`} hidden={isMobile}>
        <header
          className={`header-desktop-view ${desktopClasses.headerDesktop}`}
        >
          <div className={desktopClasses.headerSection1}>
            <div className={desktopClasses.desktopDateTime}>
              <Typography component={"span"} className={`${classes.bolded}`}>
                {daysList[currentDate.getDay()]}
              </Typography>
              <Typography component={"span"}>
                {` ${currentDate.getDay()} ${
                  monthsList[currentDate.getMonth()]
                } ${currentDate.getFullYear()}`}
              </Typography>
            </div>
            <Typography component={"span"} className={classes.title}>
              Appliance Asset Manager
            </Typography>
            <Button
              variant={"contained"}
              className={`${desktopClasses.desktopButton}`}
              onClick={() => {
                setAction(currentAction.CREATE);
                setInitialModalData(undefined);
                setModalOpen(true);
              }}
            >
              New Appliance
            </Button>
          </div>
          <div className={desktopClasses.headerSection2}>
            <FilterSearch />
          </div>
        </header>
        <div className={desktopClasses.desktopBody}>
          <CustomTable
            currentPage={currentPage}
            onPage={(pageIndex, rowsPerPage) => setCurrentPage(pageIndex)}
            data={data || []}
            columns={[
              {
                id: "serialNumber",
                header: "Serial Number",
                data: (rowData: Appliance) => rowData.serialNumber,
              },
              {
                id: "brand",
                header: "Brand",
                data: (rowData: Appliance) => rowData.brand,
              },
              {
                id: "model",
                header: "Model",
                data: (rowData: Appliance) => rowData.model,
              },
              {
                id: "dateBought",
                header: "Date Bought",
                data: (rowData: Appliance) => rowData.dateBought,
              },
              {
                id: "status",
                header: "Status",
                data: (rowData: Appliance) => {
                  const color =
                    rowData.status === "Available" ? "green" : "red";
                  return <span style={{ color: color }}>{rowData.status}</span>;
                },
              },
              {
                id: "editButton",
                header: "Actions",
                data: (rowData: Appliance) => (
                  <>
                    <Button
                      onClick={() => {
                        setAction(currentAction.MODIFY);
                        setInitialModalData(rowData);
                        setModalOpen(true);
                      }}
                      variant={"outlined"}
                      color={"primary"}
                    >
                      Update
                    </Button>
                    <Button
                      // onClick={() => {
                      //   setAction(currentAction.MODIFY);
                      //   setInitialModalData(rowData);
                      //   setModalOpen(true);
                      // }}
                      variant={"contained"}
                      color={"secondary"}
                      className={desktopClasses.buttonMargin}
                    >
                      Delete
                    </Button>
                  </>
                ),
              },
            ]}
          />
        </div>
      </main>
      <ApplianceDetailsModal
        data={initialModalData}
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(formValues: Appliance | undefined) => {}}
        title={action}
      />
    </div>
  );
}
