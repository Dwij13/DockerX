const Docker = require("dockerode");
const docker = new Docker();

const express = require("express");
const app = express();
const port = 6969;

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

// Route to stop a container
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
