#!/bin/python3

import time

from data_sender import DataSender, DataPacket

def main():
    sender = DataSender()

    packet1 = DataPacket("data1", "append", 3)
    packet2 = DataPacket("data1", "append", 5)
    packet3 = DataPacket("data1", "clear")

    sender.sendData(packet1)
    time.sleep(5)
    sender.sendData(packet2)
    time.sleep(5)
    sender.sendData(packet3)
    time.sleep(5)
    sender.sendData(packet2)

if __name__ == "__main__":
    main()
