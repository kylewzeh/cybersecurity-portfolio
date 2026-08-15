# Security Scripting

Small Python and Bash utilities written during cybersecurity scripting coursework. They demonstrate basic automation, input/error handling, command execution, and report generation—not production-grade security tooling.

## Scripts

| Script | Purpose | Limitation |
| --- | --- | --- |
| [Internet connectivity monitor](./scripts/internet_connectivity_monitor.py) | Periodically records connectivity checks. | A basic reachability check is not a complete network-health test. |
| [Network ping error handling](./scripts/network_ping_error_handling.py) | Demonstrates handling successful, failed, and invalid ping inputs. | Uses local/test examples only. |
| [Authorised network scan and SQL-awareness script](./scripts/network_scan_and_sql_awareness.sh) | Runs a constrained lab scan and records SQL-injection awareness notes. | It must be used only with explicit authorisation; it does not test arbitrary targets. |
| [System security audit](./scripts/system_security_audit.py) | Records basic firewall and ClamAV service state without collecting local identity or hardware identifiers. | It is a lightweight posture check, not a compliance assessment. |

## Safe captured output

- [Connectivity monitor log](./evidence/internet_check.log)
- [Network error log](./evidence/network_errors.txt)
- [Nmap output from a localhost lab scan](./evidence/nmap_scan_results.txt)
- [Sanitised system audit report](./evidence/audit_report.txt)

The public scripts and sample output intentionally exclude personal usernames, MAC addresses, credentials, real target addresses, API keys, and assessment questions.
