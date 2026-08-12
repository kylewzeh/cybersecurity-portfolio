#!/bin/bash

# Scan an authorised IP or range, then demonstrate safe SQL-input handling.
echo "======================================"
echo " Basic Nmap Network Scan Tool"
echo "======================================"
echo ""

read -p "Enter the authorised IP address or IP range to scan: " ip_range
if [ -z "$ip_range" ]; then
    echo "Error: No IP address or range entered."
    exit 1
fi

echo ""
echo "Choose scan type:"
echo "1. Quick Scan"
echo "2. Detailed Scan"
read -p "Enter your choice, 1 or 2: " scan_choice
output_file="nmap_scan_results.txt"

echo ""
echo "Starting scan..."
echo "Results will be saved to $output_file"
echo ""

if [ "$scan_choice" = "1" ]; then
    nmap -F "$ip_range" -oN "$output_file"
elif [ "$scan_choice" = "2" ]; then
    nmap -sV -Pn "$ip_range" -oN "$output_file"
else
    echo "Invalid option selected."
    exit 1
fi

echo "Scan completed. Results saved in: $output_file"
echo ""
echo "SQL Injection Awareness Simulation"
read -p "Enter a sample username (try typing: admin' OR '1'='1): " username

echo "--- UNSAFE APPROACH ---"
echo "Query executed: SELECT * FROM users WHERE username = '$username';"
if [[ "$username" == *"'"* ]] || [[ "$username" == *"OR"* ]]; then
    echo "[!] WARNING: SQL syntax altered by input!"
    echo "[!] Result: ACCESS GRANTED to multiple records (Data Breach!)"
else
    echo "[*] Result: Searching for user '$username'..."
fi

echo "--- SECURE APPROACH (Parameterized Query) ---"
echo "Query executed: SELECT * FROM users WHERE username = ?;"
echo "Data passed securely: [$username]"
echo "[*] Result: Searching for literal string '$username'... (No breach)"
