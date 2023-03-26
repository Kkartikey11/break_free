const express = require("express");
const router = express.Router();

// events controlers
const { getEvent, getEvents, postCreateEvent, getEventStudentsPerformance, postEventStudentsPerformance } = require("../../controler/v1/events/events");

// return a event details
router.get("/:eventId(\\d+)", getEvent);

// return events list
router.get("/", getEvents);

// create a event
router.post("/", postCreateEvent);

// return a event studernts performance details
router.get("/:eventId(\\d+)/performance", getEventStudentsPerformance);

// create a event
router.post("/:eventId(\\d+)/performance", postEventStudentsPerformance);

module.exports = router;