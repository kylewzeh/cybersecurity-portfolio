import subprocess
import time
from datetime import datetime

log_file = "internet_check.log"

def check_internet():
    current_time = datetime.now().strftime("%Y/%m/%d %H.%M.%S")
    with open(log_file, "a") as file:
        print(f"[{current_time}] Checking internet connection...")
        result = subprocess.run(
            ["ping", "-c", "1", "-W", "2", "example.com"],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            file.write(f"[{current_time}] Internet is UP\n")
            print("Logged Internet is UP")
        else:
            file.write(f"[{current_time}] Internet is DOWN\n")
            print("Logged Internet is DOWN")

print("Starting the internet monitor. Press Ctrl+C in your terminal to stop it.")

while True:
    check_internet()
    print("Waiting for 1 hour before the next check...\n")
    time.sleep(3600)
