import * as React from "react";
import {
  Modal,
  Backdrop,
  Zoom,
  makeStyles,
  Typography,
  TextField,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Appliance } from "appliances/models/ApplianceModels";

export interface IApplianceDetailsModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (formValues: Appliance | undefined) => void;
  title: string;
  data?: Appliance;
}

export function ApplianceDetailsModal(props: IApplianceDetailsModalProps) {
  const classes = useStyles();

  const [formValues, setFormValues] = React.useState<Appliance | undefined>(
    props.data
  );

  React.useEffect(() => {
    setFormValues(props.data);
  }, [props]);

  const setFormItem = (fieldName: string, value: any) => {
    setFormValues({
      ...formValues,
      [fieldName]: value,
    } as Appliance);
  };

  return (
    <Modal
      open={props.modalOpen}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableBackdropClick
      className={classes.root}
    >
      <Zoom
        in={props.modalOpen}
        style={{ transitionDelay: props.modalOpen ? "200ms" : "0ms" }}
      >
        <Paper className={`${classes.widerModal} ${classes.scrollingCard}`}>
          <div
            className={`${classes.flexed} ${classes.cardHeader} ${classes.almostFullWidth}`}
          >
            <Typography
              component={"h2"}
              className={`${classes.slightMargin} ${classes.bolder}`}
            >
              {props.title}
            </Typography>
          </div>

          <div className={`${classes.almostFullWidth}`}>
            <div className={`${classes.topMargin} ${classes.flexed}`}>
              <Typography
                component={"h3"}
                className={`${classes.flex1} ${classes.flexed}`}
              >
                Serial Number
              </Typography>
              <TextField
                fullWidth
                variant={"outlined"}
                helperText={" "}
                value={formValues?.serialNumber || ""}
                className={classes.flex3}
                onChange={(e) => setFormItem("serialNumber", e.target.value)}
              />
            </div>
            <div
              className={`${classes.smallTopMargin} ${classes.bottomMargin} ${classes.flexed}`}
            >
              <Typography
                component={"h3"}
                className={`${classes.flex1} ${classes.flexed} ${classes.alignedItems}`}
              >
                Brand
              </Typography>
              <TextField
                fullWidth
                variant={"outlined"}
                value={formValues?.brand || ""}
                className={classes.flex3}
                onChange={(e) => setFormItem("brand", e.target.value)}
              />
            </div>
            <div
              className={`${classes.topMargin} ${classes.bottomMargin} ${classes.flexed}`}
            >
              <Typography
                component={"h3"}
                className={`${classes.flex1} ${classes.flexed} ${classes.alignedItems}`}
              >
                Model
              </Typography>
              <TextField
                fullWidth
                variant={"outlined"}
                className={classes.flex3}
                value={formValues?.model || ""}
                onChange={(e) => setFormItem("model", e.target.value)}
              />
            </div>
            <div
              className={`${classes.topMargin} ${classes.bottomMargin} ${classes.flexed}`}
            >
              <Typography
                component={"h3"}
                className={`${classes.flex1} ${classes.flexed} ${classes.alignedItems}`}
              >
                Status
              </Typography>
              <Select
                variant={"outlined"}
                className={classes.flex3}
                value={formValues?.status || "Available"}
                onChange={(e) => setFormItem("status", e.target.value)}
              >
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Sold"}>Sold</MenuItem>
              </Select>
            </div>

            <div
              className={`${classes.topMargin} ${classes.bottomMargin} ${classes.flexed}`}
            >
              <Typography
                component={"h3"}
                className={`${classes.flex1} ${classes.flexed} ${classes.alignedItems}`}
              >
                Date Bought
              </Typography>
              <div className={classes.flex3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    disableToolbar
                    variant={"inline"}
                    format="MM/dd/yyyy"
                    margin="normal"
                    value={formValues?.dateBought}
                    onChange={(date: Date | null) => {
                      setFormItem("dateBought", date);
                      console.log("setting as", date);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    inputVariant={"outlined"}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </div>

          <div className={`${classes.actionBar} ${classes.almostFullWidth}`}>
            <Button
              variant={"outlined"}
              onClick={(e) => props.onClose()}
              className={classes.buttonMargin}
            >
              Cancel
            </Button>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={(e) => {
                props.onSubmit(formValues);
                props.onClose();
              }}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </Zoom>
    </Modal>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollingCard: {
    overflowY: "auto",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "center",
  },
  alignedItems: {
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  flex3: {
    flex: 3,
  },
  flexed: {
    display: "flex",
  },
  almostFullWidth: {
    width: "80%",
  },
  topMargin: {
    marginTop: "2rem",
  },
  smallTopMargin: {
    marginTop: "1rem",
  },
  bottomMargin: {
    marginBottom: "2rem",
  },
  widerModal: {
    minWidth: "76%",
    maxWidth: "90%",
    maxHeight: "70vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  slightMargin: {
    marginTop: "2rem",
  },
  bolder: {
    fontWeight: "bold",
  },
  actionBar: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "1rem 0",
  },
  buttonMargin: {
    marginRight: "1rem",
  },
});
