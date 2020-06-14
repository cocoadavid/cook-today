import RouteModel from "../models/RouteModel";
import PantryPage from "../components/pantryPage/PantryPage";

const pantryRoute = new RouteModel();
pantryRoute.path = "/pantry";
pantryRoute.component = PantryPage;

export default pantryRoute;
