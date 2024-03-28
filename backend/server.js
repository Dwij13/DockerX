// docker.listImages((err, images) => {
//   if (err) {
//     console.error("Error listing images:", err);
//     return;
//   }
//   let imageId = images[0].Id;
//   console.log(imageId);
//   docker.createContainer(
//     {
//       Image: "linux",
//     },
//     (err, container) => {
//       if (err) {
//         console.error("Error creating container:", err);
//         return;
//       }

//       container.start((err, data) => {
//         if (err) {
//           console.error("Error starting container:", err);
//           return;
//         }

//         console.log("Container started successfully:", data);
//       });
//     }
//   );
// });
// docker.listContainers((err, containers) => {
//     if (err) {
//       console.error('Error listing containers:', err);
//       return;
//     }
//     console.log('Containers:', containers);
//   });
// const containerOption = {
//   Image: "alpine",
//   Cmd: ["echo", "hello world"],
//   Tty: true,
// };

// var auxContainer;
// docker.createContainer({
//   Image: 'ubuntu',
//   AttachStdin: false,
//   AttachStdout: true,
//   AttachStderr: true,
//   Tty: true,
//   Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
//   OpenStdin: false,
//   StdinOnce: false
// }).then(function(container) {
//   auxContainer = container;
//   return auxContainer.start();
// })

const Docker = require("dockerode");
const docker = new Docker();

const express = require("express");
const app = express();
const port = 6969;

app.use(express.json());

// Route to create a container
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

// Route to start a container
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

// Route to list all containers
app.get("/containers", async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    const container1 = await docker.getContainer(containers[1].Id);
    container1.stats((err, stream) => {
      if (err) {
        console.error("Error getting container stats:", err);
        return;
      }

      stream.on("data", (data) => {
        const stats = JSON.parse(data.toString());
        console.log("Container stats:", stats);
      });

      stream.on("end", () => {
        console.log("Stream ended");
      });

      stream.on("error", (err) => {
        console.error("Stream error:", err);
      });
      setTimeout(() => {
        stream.destroy();
      }, 10000);
    });
    res.send(containers);
  } catch (error) {
    res.status(500).send(`Error listing or starting containers: ${error}`);
  }
});

app.get("/containers/:id", async (req, res) => {
  const containerId = req.params.id;
  try {
    const container = docker.getContainer(containerId);
    res.send(container);
  } catch (error) {
    res.status(500).send(`Error getting logs: ${error}`);
  }
});

// Route to list running containers
app.get("/containers/running", async (req, res) => {
  try {
    const containers = await docker.listContainers();
    res.send(containers);
  } catch (error) {
    res.status(500).send(`Error listing running containers: ${error}`);
  }
});
// Route to delete a container
app.delete("/containers/:id", async (req, res) => {
  try {
    const containerId = req.params.id;
    const container = docker.getContainer(containerId);
    await container.remove({ force: true });
    res.send(`Container ${containerId} deleted successfully`);
  } catch (error) {
    res.status(500).send(`Error deleting container: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
