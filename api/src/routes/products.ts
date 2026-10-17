import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { idParam, listQuery, productBody, productPatch } from "../schemas/product.js";
import * as service from "../services/productService.js";

export const productsRouter = Router();

productsRouter.get("/", validate(listQuery, "query"), async (_req, res) => {
  res.json(await service.list(res.locals.query));
});

productsRouter.get("/:id", validate(idParam, "params"), async (_req, res) => {
  const product = await service.getById(res.locals.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

productsRouter.post("/", validate(productBody), async (_req, res) => {
  res.status(201).json(await service.create(res.locals.body));
});

productsRouter.patch("/:id", validate(idParam, "params"), validate(productPatch), async (_req, res) => {
  res.json(await service.update(res.locals.params.id, res.locals.body));
});

productsRouter.delete("/:id", validate(idParam, "params"), async (_req, res) => {
  await service.remove(res.locals.params.id);
  res.status(204).end();
});
