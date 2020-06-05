import React from "react";
import PropTypes from "prop-types";
import VerticalNavigation from "./VerticalNavigation";
import HorizontalNavigation from "./HorizontalNavigation";

const NavigationBar = ({ variant, content, withIcon, ...props }) => {
  switch (variant) {
    case "vertical":
      return (
        <VerticalNavigation
          content={content}
          changeOrientation={props.changeOrientation}
        />
      );
    case "horizontal":
      return (
        <HorizontalNavigation
          withIcon={withIcon}
          content={content}
          changeOrientation={props.changeOrientation}
        />
      );
    default:
      return (
        <VerticalNavigation
          content={content}
          changeOrientation={props.changeOrientation}
        />
      );
  }
};

NavigationBar.propTypes = {
  variant: PropTypes.oneOf(["vertical", "horizontal"]),
  content: PropTypes.any.isRequired,
  withIcon: PropTypes.bool,
  changeOrientation: PropTypes.func
};

export default NavigationBar;
