import * as React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import { Appliance } from "../models/ApplianceModels";

export interface IListTileProps {
  data: Appliance;
}

export function ListTile(props: IListTileProps) {
  const classes = useStyles();
  const [data, setData] = React.useState<Appliance>(props.data);
  return (
    <div className={classes.root}>
      <div className={classes.mainContent}>
        <div className={classes.info}>
          <span>{data.dateBought?.toLocaleDateString()}</span>
          <span>{data.model}</span>
          <span>{data.brand}</span>
          <span>{data.serialNumber}</span>
        </div>
        <div className={classes.sideAction}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
      </div>
      <div
        className={`${classes.sideStatus} 
        ${data?.status === "Sold" ? classes.red : classes.green}`}
      />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  sideStatus: {
    flex: 1,
  },
  red: {
    backgroundColor: "#d11302",
  },
  green: {
    backgroundColor: "#009405",
  },
  info: {
    flex: 8,
  },
  sideAction: {
    flex: 1,
  },
  mainContent: {
    flex: 8,
    display: "flex",
  },
});
