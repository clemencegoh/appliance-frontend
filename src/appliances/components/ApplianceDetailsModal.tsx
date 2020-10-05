import * as React from "react";
import {
  Modal,
  Backdrop,
  Zoom,
  makeStyles,
  Typography,
  TextField,
  Paper,
  IconButton,
  Button,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Close as CloseIcon } from "@material-ui/icons";
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

  const [formValues, setFormValues] = React.useState<Appliance>();
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
          <div className={`${classes.flexed} ${classes.cardHeader}`}>
            <span />
            <Typography
              component={"h2"}
              className={`${classes.slightMargin} ${classes.bolder}`}
            >
              {props.title}
            </Typography>
            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <div>
            <div
              className={`${classes.marginTopBottom} ${classes.flexed} ${classes.almostFullWidth}`}
            >
              <Typography
                component={"h3"}
                className={`${classes.flex1} ${classes.flexed} ${classes.alignedItems}`}
              >
                Serial Number
              </Typography>
              <TextField
                fullWidth
                variant={"standard"}
                value={formValues?.serialNumber || ""}
                className={classes.flex3}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFormItem("serialNumber", e.target.value)}
              />
            </div>
            <div
              className={`${classes.marginTopBottom} ${classes.flexed} ${classes.almostFullWidth}`}
            >
              <Typography
                component={"h3"}
                className={`${classes.flex1} ${classes.flexed} ${classes.alignedItems}`}
              >
                Brand
              </Typography>
              <TextField
                fullWidth
                variant={"standard"}
                value={formValues?.brand || ""}
                className={classes.flex3}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFormItem("brand", e.target.value)}
              />
            </div>
            <div
              className={`${classes.marginTopBottom} ${classes.flexed} ${classes.almostFullWidth}`}
            >
              <Typography
                component={"h3"}
                className={`${classes.flex1} ${classes.flexed} ${classes.alignedItems}`}
              >
                Model
              </Typography>
              <TextField
                fullWidth
                variant={"standard"}
                className={classes.flex3}
                value={formValues?.model || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFormItem("model", e.target.value)}
              />
            </div>
            <div
              className={`${classes.marginTopBottom} ${classes.flexed} ${classes.almostFullWidth}`}
            >
              <Typography
                component={"h3"}
                className={`${classes.flex1} ${classes.flexed} ${classes.alignedItems}`}
              >
                Status
              </Typography>
              <TextField
                fullWidth
                variant={"standard"}
                value={formValues?.status || ""}
                className={classes.flex3}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFormItem("status", e.target.value)}
              />
            </div>

            <div
              className={`${classes.marginTopBottom} ${classes.flexed} ${classes.almostFullWidth}`}
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
                    onChange={(date: Date | null) =>
                      setFormItem("dateBought", date)
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </div>

          <div className={classes.actionBar}>
            <Button
              variant={"contained"}
              onClick={(e) => props.onSubmit(formValues)}
            >
              Save
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
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap-reverse",
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
  marginTopBottom: {
    margin: "2rem 0",
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
  },
});
