import pyautogui
import time
from pynput import keyboard

clickInMili = 1

shouldLoop = True

def on_press(key):
    global shouldLoop
    try:
        if key.char and key.char.lower() == "o":
            shouldLoop = False
    except AttributeError:
        # Non-character key was pressed, ignore it
        pass

listener = keyboard.Listener(on_press=on_press)
listener.start()

time.sleep(4);

while(shouldLoop):
    pyautogui.leftClick()
    time.sleep(clickInMili / 1000);