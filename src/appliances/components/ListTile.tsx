import * as React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { Appliance } from "../models/ApplianceModels";

export interface IListTileProps {
  data?: Appliance;
}

export function ListTile(props: IListTileProps) {
  const classes = useStyles();
  const [data, setData] = React.useState(props.data);

  React.useEffect(() => {
    setData(props.data);
  }, [props]);

  return (
    <div className={classes.root}>
      <div
        className={`${classes.sideStatus} 
        ${data?.status === "Available" ? classes.green : classes.red}`}
      />
      <div className={`${classes.mainContent} ${classes.mobileFlex}`}>
        <div className={classes.info}>
          <div className={classes.date}>
            {data?.dateBought && data.dateBought.split("T")[0]}
          </div>
          <div className={classes.model}>{data?.model}</div>
          <div className={classes.brand}>{data?.brand}</div>
          <div className={classes.sn}>{data?.serialNumber}</div>
        </div>
        <div className={classes.sideAction}>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    borderRadius: "8px",
    margin: "1rem 0",
  },
  sideStatus: {
    flex: 1,
    borderRadius: "8px 0 0 8px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  },
  red: {
    backgroundColor: "#d11302",
  },
  green: {
    backgroundColor: "#009405",
  },
  date: {
    fontStyle: "italic",
    fontSize: "0.7rem",
  },
  model: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  brand: {
    fontSize: "1rem",
  },
  sn: {
    fontSize: "1rem",
  },
  info: {
    flex: 10,
    justifyContent: "center",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  sideAction: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  mobileFlex: {
    flex: 6,
  },
  desktopFlex: {
    flex: 20,
  },
  mainContent: {
    display: "flex",
    margin: "0.5rem",
  },
});
