# WSL2 and WireGuard lab connectivity

## Context

The monitoring lab ran on WSL2 distributions including Kali, Ubuntu 22.04, and a Wazuh-server environment. The [distribution list](../../network-security-assessment/screenshots/wsl2-lab-distributions.jpg) records that local context without exposing the Windows username.

Some lecturer-hosted lab access used WireGuard and Windows-to-WSL forwarding. The [sanitised WireGuard view](../../network-security-assessment/screenshots/wireguard-handshake-sanitized.jpg) shows only recent-handshake and transfer-status lines; it omits keys, peer data, endpoint, port, and allowed ranges.

## Troubleshooting lessons

When an agent did not connect, I checked the manager address, WireGuard/WSL routing, and version alignment. These were practical connectivity checks in the lab, not a claim of administering a production VPN or enterprise endpoint fleet.
