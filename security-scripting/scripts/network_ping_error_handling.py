import subprocess
import datetime
import time

def log_error(message):
    now = datetime.datetime.now().strftime("%Y/%m/%d %H.%M.%S")
    with open("network_errors.txt", "a") as log_file:
        log_file.write(f"{now} ERROR {message}\n")

def ping_ip(ip_address, retry=False):
    try:
        if not ip_address:
            raise ValueError("Missing IP address")
        print(f"Pinging {ip_address}...")
        result = subprocess.run(
            ["ping", "-c", "1", "-W", "2", ip_address],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        if result.returncode == 0:
            print(f"Success the host {ip_address} is reachable.")
        else:
            raise ConnectionError(f"Host {ip_address} is unreachable")
    except ValueError as e:
        print(f"Input Error {e}")
        log_error(str(e))
    except ConnectionError as e:
        print(f"Network Error {e}")
        if not retry:
            print("Retrying once...")
            time.sleep(1)
            ping_ip(ip_address, retry=True)
        else:
            print("Retry failed.")
            log_error(str(e))
    except Exception as e:
        print(f"An unexpected error happened {e}")
        log_error(str(e))

lab_ips = ["127.0.0.1", "", "10.255.255.255"]

print("Starting network sweep...")
for ip in lab_ips:
    ping_ip(ip)
    print("")
