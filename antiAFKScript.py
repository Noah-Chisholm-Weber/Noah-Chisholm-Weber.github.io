from pynput.keyboard import Key, Controller
import time

keyboard = Controller()

time.sleep(3)  # Wait so you can switch to another window

while(True):
    # Hold down the "a" key
    keyboard.press('a')

    # Keep it held for 1 second
    time.sleep(1)

    # Release the "a" key
    keyboard.release('a')

    # Hold down the "a" key
    keyboard.press('s')

    # Keep it held for 1 second
    time.sleep(1)

    # Release the "a" key
    keyboard.release('s')

    # Hold down the "a" key
    keyboard.press('d')

    # Keep it held for 1 second
    time.sleep(1)

    # Release the "a" key
    keyboard.release('d')

    # Hold down the "a" key
    keyboard.press('w')

    # Keep it held for 1 second
    time.sleep(1)

    # Release the "a" key
    keyboard.release('w')
