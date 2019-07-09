// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import { Dashboard } from "./containers/dashboard/Dashboard";
import  Customer  from "./containers/customer/customer";
import  PingNetWorkSchedule  from "./containers/ping-network-schedule/Ping";
import  DeviceManagement  from "./containers/device-management/DeviceManagement";
import  ScheduleManagement  from "./containers/schedule-management/ScheduleManagement";
// import UserProfile from "views/UserProfile/UserProfile.jsx";
// import TableList from "views/TableList/TableList.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/dashboard"
  },
  {
    path: "/customer",
    name: "Customer",
    rtlName: "Customer",
    icon: Person,
    component: Customer,
    layout: "/dashboard"
  },
  {
    path: "/ping",
    name: "Ping",
    rtlName: "Ping",
    icon: Person,
    component: PingNetWorkSchedule,
    layout: "/dashboard"
  },
  {
    path: "/device",
    name: "Device",
    rtlName: "Device",
    icon: Person,
    component: DeviceManagement,
    layout: "/dashboard"
  },
  {
    path: "/schedule",
    name: "Schedule",
    rtlName: "Schedule",
    icon: Person,
    component: ScheduleManagement,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
