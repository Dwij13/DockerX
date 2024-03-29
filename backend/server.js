const Docker = require("dockerode");
const docker = new Docker();

const express = require("express");
const app = express();
const port = 6969;
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.post("/containers/create", async (req, res) => {
  const { imageName, containerName } = req.body;
  try {
    const container = await docker.createContainer({
      Image: imageName,
      name: containerName,
      Tty: true,
    });
    res.status(201).send(`Container ${containerName} created successfully`);
  } catch (error) {
    res.status(500).send(`Error creating container: ${error}`);
  }
});

app.post("/containers/:id/start", async (req, res) => {
  const containerId = req.params.id;
  try {
    const container = docker.getContainer(containerId);
    await container.start();
    res.send(`Container started successfully`);
  } catch (error) {
    res.status(500).send(`Error starting container: ${error}`);
  }
});

app.get("/containers/:id/status", async (req, res) => {
  const containerId = req.params.id;
  try {
    const container = docker.getContainer(containerId);
    const stats = await container.stats({ stream: false });
    const cpu_stats = stats.cpu_stats;
    const memory_stats = stats.memory_stats;
    res.send({ cpu_stats, memory_stats });
  } catch (error) {
    console.error(`Error getting container stats: ${error}`);
    res.status(500).send(`Error getting container stats: ${error}`);
  }
});

app.get("/containers/:id/", async (req, res) => {
  const containerId = req.params.id;
  try {
    const container = docker.getContainer(containerId);
    let status = await container.inspect();
    res.send(status);
  } catch (error) {
    res.status(500).send(`Error starting container: ${error}`);
  }
});

app.post("/containers/:id/stop", async (req, res) => {
  const containerId = req.params.id;
  try {
    const container = docker.getContainer(containerId);
    await container.stop();
    res.send(`Container stopped successfully`);
  } catch (error) {
    res.status(500).send(`Error stopping container: ${error}`);
  }
});
app.post("/containers/:id/restart", async (req, res) => {
  const containerId = req.params.id;
  try {
    const container = docker.getContainer(containerId);
    await container.restart();
    res.send(`Container restarted successfully`);
  } catch (error) {
    res.status(500).send(`Error restarting container: ${error}`);
  }
});

app.get("/containers", async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    res.send(containers);
  } catch (error) {
    res.status(500).send(`Error listing containers: ${error}`);
  }
});

app.get("/containers/running", async (req, res) => {
  try {
    const containers = await docker.listContainers();
    res.send(containers);
  } catch (error) {
    res.status(500).send(`Error listing running containers: ${error}`);
  }
});
app.delete("/containers/:id", async (req, res) => {
  const containerId = req.params.id;
  try {
    const container = docker.getContainer(containerId);
    await container.remove();
    res.send(`Container ${containerId} deleted successfully`);
  } catch (error) {
    res.status(500).send(`Error deleting container: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
