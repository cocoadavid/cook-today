import TestPage from "./routes/TestPage";
// you can find available icons names here: https://material-ui.com/components/material-icons/ and https://material.io/resources/icons/?style=baseline
// icon names must be lowercase and used with underscore

// HomePage exists by default, you should not include it here. You can delete it in App.js, if you would like to.
export const menuItems = [
    {
        label: "test",
        url: "/test",
        component: TestPage,
        icon: "timeline"
    },
];