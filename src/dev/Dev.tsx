import { ApplianceDetailsModal } from "appliances/components/ApplianceDetailsModal";
import { Appliance } from "appliances/models/ApplianceModels";
/**
 * Dev page for developing and testing new components
 */

import React, { useEffect } from "react";
import api from "core/services/apiService";

export default function DevelopmentPage() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<Appliance>();

  // useEffect(() => {
  //   api.get<Appliance[]>("all").then((resp) => {
  //     console.log(resp.data);
  //   });
  // }, []);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Modal
      </button>
      <ApplianceDetailsModal
        modalOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={() => {}}
        title={"Appliance Creation"}
        data={data}
      />
    </div>
  );
}
