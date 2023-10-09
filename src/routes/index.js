const { Router } = require("express");
const router = Router();
module.exports = router;
import person_route from "./client";
import company_route from "./company";

const routes = {
  person_route,
  company_route,
};

export default routes;
