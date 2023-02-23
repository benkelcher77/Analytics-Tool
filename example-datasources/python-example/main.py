#!/bin/python3

import time

from data_sender import DataSender, DataPacket

def main():
    sender = DataSender()

    sender.sendData(DataPacket("data1", "clear"))
    packets = [DataPacket("data1", "append", { "x": i, "y": i ** 2 }) for i in range(10)]
        
    for packet in packets:
        sender.sendData(packet)
        time.sleep(5)

if __name__ == "__main__":
    main()
