import subprocess
from datetime import datetime

audit_file = "audit_report.txt"

def check_firewall():
    try:
        result = subprocess.run(["ufw", "status"], capture_output=True, text=True)
        return "Enabled" if "Status: active" in result.stdout else "Disabled or Not Configured"
    except FileNotFoundError:
        return "Firewall command not found (Requires root/sudo or UFW installation)"

def check_antivirus():
    try:
        result = subprocess.run(["systemctl", "is-active", "clamav-daemon"], capture_output=True, text=True)
        return "Running (ClamAV Service is Active)" if result.stdout.strip() == "active" else "Not Running (Simulated AV Check)"
    except FileNotFoundError:
        return "Not Running / Command Not Found"

def generate_audit_report():
    print("Starting system security audit...")
    current_time = datetime.now().strftime("%Y/%m/%d %H.%M.%S")
    firewall_status = check_firewall()
    av_status = check_antivirus()
    with open(audit_file, "w") as file:
        file.write("======================================\n")
        file.write("      SYSTEM SECURITY AUDIT REPORT    \n")
        file.write("======================================\n\n")
        file.write(f"Date and Time    : {current_time}\n")
        file.write("Local identity   : Not collected\n")
        file.write("Hardware ID      : Not collected\n")
        file.write("--------------------------------------\n")
        file.write("Security Posture Checks\n")
        file.write("--------------------------------------\n")
        file.write(f"Firewall Status  : {firewall_status}\n")
        file.write(f"Antivirus Status : {av_status}\n")
        file.write("======================================")
    print(f"Audit completed successfully. Results saved in {audit_file}")

generate_audit_report()
