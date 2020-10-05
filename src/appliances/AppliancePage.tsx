import * as React from "react";

import { useMediaQuery } from "@material-ui/core";

export interface IAppliancePageProps {}

export default function AppliancePage(props: IAppliancePageProps) {
  const isMobile = useMediaQuery("(max-width: 760px)");

  return (
    <div>
      Hello World!
      <main className={`mobile-view`}>
        <section className={`header-mobile-view`}>
          <section className={`section-1`}>
            <div className={`Date-and-Time-today`}></div>
            <div className={`title`}></div>
          </section>
          <section className={`section-2`}>
            <div className={`search icon button`}></div>
          </section>
        </section>

        <div className={`body`}>
          <div className={`searchbar-single-field open?`}></div>
          <div className={`main-body-accordian`}></div>
          <button className={`Add new Appliance button`}></button>
        </div>

        <section className={`search modal ??? not sure`}>
          <div className={"textfields..."}></div>
          <span className={`apply Button`}></span>
        </section>
      </main>

      <main className={`desktop-view`}>
        <div className={`header-desktop-view`}>
          <div className={`title`}></div>
          <div className={`Date-and-Time-today`}></div>
          <div className={`add-new-button`}></div>
        </div>
        <div className={`body`}>
          <div className={`searchbar-single-field-only`}></div>
          <div className={`main-body-table`}></div>
        </div>
      </main>

      <section className={`new appliance modal`}>
        <div className={"textfields..."}></div>
        <span className={`save Button`}></span>
      </section>
    </div>
  );
}
