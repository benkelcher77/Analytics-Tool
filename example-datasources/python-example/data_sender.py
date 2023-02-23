#!/bin/python3

import requests

class DataSender():
    def __init__(self, sink_url="http://localhost:5000/api"):
        """Constructor for the DataSender class.

        Inputs:
            sink_url (str): URL of the server to send data to.

        Returns:
            None
        """

        self.url = sink_url

    def sendData(self, data):
        """Method to send data to the server.

        Inputs:
            data (DataPacket): Data to send to the server.

        Returns:
            response (requests.Response): Response from the server.
        """

        response = requests.post(self.url, json=data.asJSON())
        return response

class DataPacket():
    def __init__(self, targetDatasetName, action, value=None):
        """Constructor for the DataPacket class.

        Inputs:
            targetDatasetName (str): The name of the server-side dataset that we
                want to have an effect on.
            action (str): One of ["append", "clear"]. The action to perform on the
                specified server-side dataset.
            value (any): The data to send, if any.
        """

        self.name = targetDatasetName
        self.action = action
        self.value = value

        if action not in ["append", "clear"]:
            print(f"WARNING: Unknown action {action}.")

    def asJSON(self):
        """Method to convert the DataPacket object to a dictionary.

        Inputs:
            None

        Returns:
            (dict): This DataPacket object as a dictionary.
        """

        return {
            "name": self.name,
            "action": self.action,
            "value": self.value
        }

if __name__ == "__main__":
    print("ERROR: This file is not meant to be run as a standalone script.")
    exit(1)
