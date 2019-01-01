#!/usr/bin/env python3

# WS server example

import asyncio
import websockets
        

async def echo(websocket, path):
    try:
        while True:
            msg = await websocket.recv()
            print("< %r"%(msg))
            await websocket.send(msg)
            print("> %r"%(msg))
    except websockets.exceptions.ConnectionClosed:
        print("-- connection closed")


start_server = websockets.serve(echo, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

