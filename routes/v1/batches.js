const express = require("express");
const router = express.Router();

// batches controlers
const { getBatch, getBatches, postCreateBatch, updateBatch, postDeleteBatch } = require("../../controler/v1/batches/batches");

// return a batch details
router.get("/:batchId(\\d+)", getBatch);

// return batches list
router.get("/", getBatches);

// create a subject
router.post("/", postCreateBatch);

// update a batch
router.post("/:batchId(\\d+)", updateBatch);

// delete a batch
router.post("/:batchId(\\d+)/delete", postDeleteBatch);

module.exports = router;