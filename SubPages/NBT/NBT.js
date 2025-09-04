import { initBilling } from "./SubJS/billing.js";
import { initRetail } from "./SubJS/retail.js";
import { initChanges } from "./SubJS/changes.js";

document.addEventListener("DOMContentLoaded", () => {
  initBilling();
  initRetail();
  initChanges();
});
