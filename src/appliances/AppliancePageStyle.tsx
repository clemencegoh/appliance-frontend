import { makeStyles } from "@material-ui/core";

export const useCommonStyles = makeStyles({
  root: {
    height: "100vh",
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

export const useDesktopStyles = makeStyles({
  root: {
    height: "100vh",
  },
  headerDesktop: {
    // backgroundImage: "linear-gradient(to top right, #d1f9ff, #54e9ff)",
    height: "20vh",
    borderRadius: "0 0 0 40px",
  },
  desktopBody: {
    margin: "1rem 2rem",
  },
  buttonMargin: {
    marginLeft: "1rem",
  },
  desktopDateTime: {},
  desktopButton: {
    fontWeight: "bold",
    backgroundColor: "#7dafff",
    "&:hover": {
      backgroundColor: "#5999ff",
    },
    height: "fit-content",
  },
  headerSection1: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    padding: "2rem 2rem 0 2rem",
  },
  headerSection2: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const useMobileStyles = makeStyles({
  mobileMain: {
    width: "92vw",
    margin: "auto",
  },
  mobileBody: {
    height: "80vh",
    overflowY: "auto",
  },
  listTile: {},
});
