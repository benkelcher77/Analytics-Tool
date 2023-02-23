const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming requests with JSON.

data = {}; // TODO Look into different types of databases.

app.get("/api", (req, res) => {
    res.json(data);
});

app.post("/api", (req, res) => {
    let incomingData = req.body;
    switch (incomingData.action) {
        case "append":
            if (!data[incomingData.name])
                data[incomingData.name] = []
                
            data[incomingData.name].push(incomingData.value);
            res.json({ message: "Successfully handled POST request." });
            break;

        case "clear":
            if (data[incomingData.name]) {
                data[incomingData.name] = []
                res.json({ message: "Successfully handled POST request." });
            } else {
                res.json({ message: `No such dataset ${incomingData.name}` });
            }
            break;
            

        default:
            console.log(`Invalid action ${incomingData.action}`);
            res.json({ message: `Invalid action ${incomingData.action}` });
            break;
    }

});

app.listen(5000, () => console.log("App listening on port 5000."));
