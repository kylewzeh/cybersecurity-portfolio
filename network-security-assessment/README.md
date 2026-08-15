# Network Security Assessment

## Scope

Authorised discovery and testing against deliberately vulnerable coursework/lab systems. This is not external penetration-testing work, and no credentials, database contents, target addresses, or assessment submissions are included.

## What I practised

- Nmap discovery, port scanning, service enumeration, and version detection.
- Reading packet and traffic output in Wireshark, tshark, and tcpdump during controlled tests.
- Authorised SSH/Hydra and Metasploit exercises in an intentionally vulnerable lab; recovered credentials and unsafe console detail are not published.
- SQL injection/SQLmap exercises only against the authorised vulnerable web application; database dumps are excluded.
- WireGuard connectivity and WSL2/Kali/Ubuntu troubleshooting that supported the lab environment.
- Translating exposed services and older versions into cautious, lab-context remediation recommendations.

## Selected evidence

| Evidence | What it demonstrates |
| --- | --- |
| [Nmap service enumeration](./screenshots/nmap-service-enumeration-sanitized.jpg) | Open FTP, SSH, and HTTP services with detected service/version information; the target address and hardware identifier are excluded. |
| [Authorised Metasploit session](./screenshots/metasploit-authorised-session-sanitized.jpg) | A command-shell session opened in the intentionally vulnerable lab and a `whoami` check; all connection details are redacted. |
| [WireGuard handshake](./screenshots/wireguard-handshake-sanitized.jpg) | A recent tunnel-handshake status and transfer counters, cropped to omit keys, peers, endpoint, port, and allowed ranges. |
| [WSL2 distributions](./screenshots/wsl2-lab-distributions.jpg) | Kali, Ubuntu 22.04, and a Wazuh-server distribution listed in the local WSL2 lab. |

## Practical interpretation

The Nmap result is evidence of exposed services and software banners, not proof of compromise. The successful session screenshot is evidence of an authorised, intentionally vulnerable lab exercise only. Packet-capture work is described as controlled traffic validation, not persistent network monitoring.

## Remediation themes

- Remove or restrict services that are not needed.
- Patch or replace outdated components after validating compatibility.
- Prefer encrypted administration and file-transfer paths.
- Limit administrative/database exposure with host and network controls.
- Verify changes with repeatable, authorised scans and relevant logs.

## Related write-up

[Controlled network enumeration and authorised lab testing](../technical-writeups/writeups/controlled-network-assessment.md)
