import { ApplianceDetailsModal } from "appliances/components/ApplianceDetailsModal";
import { Appliance } from "appliances/models/ApplianceModels";
/**
 * Dev page for developing and testing new components
 */

import React, { useEffect } from "react";
import api from "core/services/apiService";
import { ListTile } from "appliances/components/ListTile";
import { CustomTable } from "appliances/components/CustomTable";
import { Button } from "@material-ui/core";

export default function DevelopmentPage() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<Appliance[]>();
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  useEffect(() => {
    api.get<Appliance[]>("appliances/all").then((resp) => {
      setData(resp.data);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "86vw",
          margin: "2rem auto",
          textAlign: "center",
        }}
      >
        <ListTile data={(data && data[0]) || ({} as Appliance)} />
      </div>
      {/* <CustomTable
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
              const color = rowData.status === "Available" ? "green" : "red";
              return <span style={{ color: color }}>{rowData.status}</span>;
            },
          },
          {
            id: "editButton",
            header: "Actions",
            data: (rowData: Appliance) => (
              <Button onClick={() => console.log(rowData.id, "edit!")}>
                Update
              </Button>
            ),
          },
        ]}
      /> */}
    </div>
  );
}
