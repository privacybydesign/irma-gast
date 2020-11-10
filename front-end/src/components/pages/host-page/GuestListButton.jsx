import React from "react";
import Button from "@material-ui/core/Button";

const styles = {
  buttonText: {
    textAlign: "left",
  },
};

const GuestListButton = ({text, icon, forwardedRef, ...buttonProps}) => (
  <Button size="large" startIcon={icon} {...buttonProps} ref={forwardedRef}>
    <span style={styles.buttonText}>
      {text}
    </span>
  </Button>
);

// We have to wrap this into a forward ref in order to be able to use
// this button within a tooltip listener.
export default React.forwardRef((props, ref) =>
  <GuestListButton {...props} forwardedRef={ref}/>
);
