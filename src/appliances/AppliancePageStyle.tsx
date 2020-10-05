import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    // backgroundImage: "linear-gradient(to top right, #f0f0f0, #a7defa)",

    height: "100vh",
  },
  headerDesktop: {
    backgroundImage: "linear-gradient(to top right, #f0f0f0, #a7defa)",
    height: "20vh",
  },
  bolded: {
    fontWeight: "bold",
  },
  smallFont: {
    fontSize: "0.7rem",
  },
  dateTimeHeader: {
    margin: "auto 0 0 1rem",
  },
  dateTime: {
    textAlign: "left",
    display: "flex",
  },
  mobileHeader: {},
  section1: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "2rem",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  searchField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1em",
  },
  searchWrapper: {
    padding: "4px 0",
    width: "100vw",
  },
  customSelect: {
    marginTop: "4px",
    borderRadius: "4px 0 0 4px",
  },
  customTextField: {
    flex: 1,
    borderRadius: "0 4px 4px 0",
  },
  callToActionButton: {},
  mainBody: {
    flex: 1,
  },
  fab: {
    backgroundColor: "#7dafff",
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
    "&:hover": {
      backgroundColor: "#5999ff",
    },
  },
  extendedIcon: {
    marginRight: "0.5rem",
  },
});
