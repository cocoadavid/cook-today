export default class RouteModel {
  constructor(component, path, params, exact) {
    this.component = component;
    this.path = path;
    this.params = params;
    this.exact = exact;
  }
}
