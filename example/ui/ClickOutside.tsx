import React from "react";
import ClickOutside from "../../src/ClickOutside";

const Accordion = () => {
   return (
      <ClickOutside onClickOutside={() => console.log("Clicked outside")}>
         <div>Accordion</div>
      </ClickOutside>
   );
};

export default Accordion;
