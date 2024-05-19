/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import ManagersTable from "./views/ManagersTable";

function Signout() {

  // Remove the 'token' from the local storage
  localStorage.removeItem('swiftcar-token');
  window.location.href = '/admin/dashboard';


  return null;
}


import { withAuth } from './withAuth';
import {SignIn} from "./views/SignIn";

// Wrap the Dashboard component with the withAuth HOC
// Wrap the components with the withAuth HOC
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedManagersTable = withAuth(ManagersTable);

// Use the protected components in your routes
// Get the token from local storage
const token = localStorage.getItem('swiftcar-token');

// Define the routes
var dashRoutes = token ? [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: <ProtectedDashboard />,
    layout: "/admin",
  },
  {
    path: "/extended-tables",
    name: "Managers",
    icon: "users_single-02",
    component: <ProtectedManagersTable />,
    layout: "/admin",
  },
  {
    path: "/Signout",
    name: "Signout",
    icon: "media-1_button-power",
    component: <Signout />,
    layout: "/admin",
  },
] : [
  {
    path: "/SignIn",
    name: "SignIn",
    icon: "media-1_button-power",
    component: <SignIn />,
    layout: "/admin",
  },
];
export default dashRoutes;
