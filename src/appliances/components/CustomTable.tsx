import * as React from "react";
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableFooter,
  IconButton,
  makeStyles,
  TablePagination,
  Paper,
} from "@material-ui/core";
import { api } from "core/services/apiService";

import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";

export type ColumnDef<T> = {
  id: string;
  header: string;
  data: (rowData: T) => React.ElementType | any;
};

export interface ICustomTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  currentPage: number;
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  onPage?: (pageIndex: number, rowsPerPage: number) => void;
}

/**
 * Table with custom pagination
 */
export function CustomTable<T>(props: ICustomTableProps<T>) {
  const classes = useStyles2();

  const {
    columns,
    data,
    currentPage,
    rowsPerPage,
    setRowsPerPage,
    onPage,
  } = props;

  const [dataCount, setDataCount] = React.useState<number>(0);

  React.useEffect(() => {
    api.get("appliances/all").then((resp) => {
      setDataCount(resp?.data?.length || 0);
    });
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPage && onPage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    onPage && onPage(0, newRowsPerPage);
  };

  function EnhTableHead() {
    return (
      <TableHead className={classes.tableHead}>
        <TableRow>
          {columns.map((_cell, _cellIndex) => (
            <TableCell
              id={_cell.header}
              key={_cellIndex}
              align={"center"}
              colSpan={1}
              rowSpan={1}
            >
              {_cell.header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  function EnhTableBody() {
    if (data?.length > 0) {
      return (
        <>
          {data?.map((rowData, rowIndex) => {
            return (
              <TableRow key={rowIndex}>
                {columns?.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} align={"center"}>
                    {cell.data(rowData)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </>
      );
    }
    return (
      <tr>
        <td colSpan={99} className={`placeholder`}>
          No data
        </td>
      </tr>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        {EnhTableHead()}
        <TableBody>{EnhTableBody()}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              colSpan={99}
              count={dataCount}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  tableHead: {
    backgroundColor: "#c1dfe3",
  },
});

const useStyles1 = makeStyles({
  root: {
    flexShrink: 0,
    marginLeft: "2.5rem",
  },
});
