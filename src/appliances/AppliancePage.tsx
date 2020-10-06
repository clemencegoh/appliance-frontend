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
  CircularProgress,
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
import { snackbar } from "core/services/snackbarService";

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
  const [loading, setLoading] = React.useState<boolean>(false);

  // data
  const [data, setData] = React.useState<Appliance[]>();
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  /**
   * Used for mobile data pagination, different way from desktop
   */
  const [mobileData, setMobileData] = React.useState<Appliance[]>();
  const [fakePage, setFakePage] = React.useState<number>(0);
  const [lastPage, setLastPage] = React.useState<boolean>(false);

  function refreshData(fieldName?: string, fieldValue?: string) {
    const query = `appliances?page=${currentPage}&numberPerPage=${rowsPerPage}${
      (fieldName && `&${fieldName}=${fieldValue}`) || ""
    }`;
    api.get<Appliance[]>(query).then((resp) => {
      setLoading(false);
      setData(resp?.data || []);
    });
  }

  function appendData() {
    const query = `appliances?page=${fakePage}&numberPerPage=${10}`;
    api.get<Appliance[]>(query).then((resp) => {
      setLoading(false);
      if (resp.data.length <= 0) {
        snackbar.show("No more data to show", { severity: "warning" });
        setLastPage(true);
        return;
      }
      if (mobileData) {
        setMobileData([...mobileData, ...resp.data]);
      } else {
        setMobileData(resp.data);
      }
    });
  }

  React.useEffect(() => {
    refreshData();
    appendData();
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
          <FilterSearch
            onLoad={() => setLoading(true)}
            onSearch={(field, value) => {
              refreshData(field, value);
            }}
          />
        </Collapse>

        <div className={`${mobileClasses.mobileBody}`}>
          <div className={mobileClasses.listTile}>
            {data?.map((item) => (
              <ListTile data={item} />
            ))}
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={() => {
                  setLoading(true);
                  if (lastPage) {
                    snackbar.show("No more data to show", {
                      severity: "warning",
                    });
                    setLoading(false);
                  } else {
                    setFakePage(fakePage + 1);
                    appendData();
                  }
                }}
              >
                Load More
              </Button>
            )}
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
            <AddIcon />
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
            <FilterSearch
              onLoad={() => setLoading(true)}
              onSearch={(field, value) => {
                refreshData(field, value);
              }}
            />
          </div>
        </header>
        <div className={desktopClasses.desktopBody}>
          <CustomTable
            currentPage={currentPage}
            onPage={(pageIndex, numberPerPage) => setCurrentPage(pageIndex)}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
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
                      onClick={() => {
                        api.delete(`appliances/${rowData.id}`).then((resp) => {
                          snackbar.show("Successfully deleted", {
                            severity: "success",
                          });

                          setCurrentPage(0);
                          refreshData();
                        });
                      }}
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
        onSubmit={(formValues: Appliance | undefined) => {
          if (action === currentAction.CREATE) {
            formValues &&
              api
                .post(`appliances`, formValues)
                .then((resp) => {
                  snackbar.show("Successfully created", {
                    severity: "success",
                  });
                  setCurrentPage(0);
                  refreshData();
                })
                .catch((err) => {
                  snackbar.show(err.message || err.msg || err, {
                    severity: "error",
                  });
                });
            return;
          }
          formValues &&
            api
              .put(`appliances/${formValues.id}`, formValues)
              .then((resp) => {
                snackbar.show("Successfully updated", { severity: "success" });
                setCurrentPage(0);
                refreshData();
              })
              .catch((err) => {
                snackbar.show(err.message || err.msg || err, {
                  severity: "error",
                });
              });
        }}
        title={action}
      />
    </div>
  );
}
