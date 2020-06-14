import RouteModel from "../models/RouteModel";
import HomePage from "../components/homePage/HomePage";

const homeRoute = new RouteModel();
homeRoute.exact = true;
homeRoute.path = "/";
homeRoute.component = HomePage;

export default homeRoute;
