import pyautogui
import time
import numpy as np
from PIL import ImageGrab
from pynput import keyboard

running = False
toggled = False

def is_red(pixel, tolerance=50):
    r, g, b = pixel
    return (
        r > 180 and  # Lowered threshold
        g < tolerance and
        b < tolerance and
        r > g and
        r > b
    )

def find_red_pixel():
    screenshot = ImageGrab.grab((850, 450, 1050, 650))
    image_np = np.array(screenshot)

    height, width, _ = image_np.shape

    for y in range(0, height, 2):
        for x in range(0, width, 2):
            pixel = image_np[y, x]
            if is_red(pixel):
                return (x, y)
    return None

def wait_until_red_disappears():
    while running:
        if not find_red_pixel():
            return
        time.sleep(0.1)

def wait_until_red_appears():
    while running:
        if find_red_pixel():
            return
        time.sleep(0.1)

def on_press(key):
    global running, toggled

    try:
        if key.char == "o":
            toggled = not toggled
            running = toggled
            print(f"{'Started' if running else 'Paused'} automation.")
        if key.char == "k":
            screenshot = ImageGrab.grab((850, 450, 1050, 650))
            screenshot.save("example.png")
            print("screenshot saved")
    except AttributeError:
        if key == keyboard.Key.esc:
            print("ESC pressed — exiting.")
            return False

# Start key listener in background
listener = keyboard.Listener(on_press=on_press)
listener.start()

print("Press `'` to start/pause automation. Press ESC to exit.")
time.sleep(1)

# Main loop

while True:
    if running:
        print("waiting for red")
        wait_until_red_appears()
        if running:
            print("waiting for not red")
            wait_until_red_disappears()

        if running:
            print("clicking")
            pyautogui.rightClick()
            time.sleep(0.1)
            pyautogui.rightClick()
    else:
        time.sleep(0.1)  # Prevent 100% CPU when paused
