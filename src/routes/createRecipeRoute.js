import RouteModel from "../models/RouteModel";
import CreateRecipePage from "../components/createRecipePage/CreateRecipePage";

const createRecipeRoute = new RouteModel();
createRecipeRoute.path = "/create-recipe";
createRecipeRoute.component = CreateRecipePage;

export default createRecipeRoute;
