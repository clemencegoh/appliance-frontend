import { ApplianceDetailsModal } from "appliances/components/ApplianceDetailsModal";
import { Appliance } from "appliances/models/ApplianceModels";
/**
 * Dev page for developing and testing new components
 */

import React, { useEffect } from "react";
import api from "core/services/apiService";
import { ListTile } from "appliances/components/ListTile";

export default function DevelopmentPage() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<Appliance[]>();

  useEffect(() => {
    api.get<Appliance[]>("all").then((resp) => {
      setData(resp.data);
    });
  }, []);

  return (
    <div>
      <ListTile data={data ? data[0] : ({} as Appliance)} />
    </div>
  );
}
