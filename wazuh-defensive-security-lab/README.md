# Wazuh Defensive Security Lab

## Lab purpose

I built a Wazuh-based monitoring lab to practise endpoint visibility, detection validation, and evidence-led investigation. The environment evolved from local WSL2 distributions to monitored Ubuntu, Kali, Metasploitable, and lecturer-hosted lab systems; a later Azure Ubuntu lab endpoint was also connected for monitoring practice.

This is controlled lab work, not a production SOC deployment.

## What I configured and tested

- Reviewed Wazuh agent status and connectivity while troubleshooting manager address, WireGuard/WSL routing, and version-alignment issues.
- Used Wazuh alerts to examine agent, rule, severity, frequency, source/destination fields, and the original event log.
- Added a custom Wazuh rule for iptables-prefixed lab log events, then retested after a log-prefix/rule-collision issue.
- Validated FIM behaviour with controlled create, modify, move, and delete actions in monitored and comparison paths. The published image is a representative integrity event, not a claim that every test appears in one view.
- Reviewed Security Configuration Assessment results against the CIS Ubuntu 22.04 LTS benchmark.
- Used the lab correlation path: **Nmap scan → iptables logging → host log → Wazuh agent → Wazuh manager → rule/alert**. Wazuh is not presented as natively detecting Nmap; the alert evidence depends on the host logging and rule path I configured.

## Selected evidence

| Evidence | What is visibly demonstrated |
| --- | --- |
| [Agent status](./screenshots/wazuh-agent-status.jpg) | Wazuh agents shown with operating-system, version, and connection status. Address values are redacted. |
| [Port-change alert](./screenshots/wazuh-port-change-alert.jpg) | A level-7 Wazuh alert for a changed listening-port state on the Kali agent. |
| [Custom iptables rule](./screenshots/wazuh-custom-iptables-rule.jpg) | A custom Wazuh XML rule matching the `IPTABLES` field, with a deliberately low base severity. |
| [Firewall correlation rule](./screenshots/wazuh-firewall-correlation-rule.jpg) | A high-severity correlation rule with frequency/timeframe configuration for repeated firewall drop events. |
| [Alert severity overview](./screenshots/wazuh-alert-severity-overview.jpg) | Dashboard counts grouped by severity, used as a basic triage starting point. |
| [Authentication alert investigation](./screenshots/wazuh-authentication-alert-investigation.jpg) | A Wazuh event-detail view used to inspect a lab authentication indicator; addresses and sensitive event fields are redacted. |
| [FIM event](./screenshots/wazuh-file-integrity-monitoring.jpg) | File-integrity event fields showing a monitored path and integrity-change context. |
| [CIS-aligned SCA](./screenshots/wazuh-security-configuration-assessment.jpg) | Wazuh SCA results for the CIS Ubuntu 22.04 benchmark, including passed/failed/not-applicable totals. |

## Investigation approach

I treated alerts as starting points: confirm the affected agent, read the rule and severity, inspect event fields and the original log, then compare against expected lab activity. This helped distinguish normal configuration changes from the generated authentication, firewall, and integrity test cases.

## Constraints and lessons learned

- Agent connectivity is an operational dependency: a wrong manager address, routing issue, or incompatible version can prevent useful telemetry.
- FIM has an interval and event timing matters; a controlled change is not always visible instantly.
- Custom detections need retesting when the host log format changes.
- Dashboard counts assist prioritisation but are not sufficient evidence by themselves.

## Related material

- [Evidence register](./docs/evidence-register.md)
- [Custom detection and firewall logging write-up](../technical-writeups/writeups/wazuh-custom-detection-and-firewall-logging.md)
- [FIM validation write-up](../technical-writeups/writeups/wazuh-fim-validation.md)
- [WSL2 and WireGuard connectivity write-up](../technical-writeups/writeups/wsl2-wireguard-wazuh-connectivity.md)
