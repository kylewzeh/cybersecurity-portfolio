# Incident Response Lab

## Scope

A controlled Wazuh investigation exercise, supplemented by a self-directed Azure Ubuntu monitoring/deception lab. Neither is a live organisational incident or a claim of production incident-response experience.

## Response workflow practised

1. Review the alert, rule context, affected agent, and original event information.
2. Scope the lab endpoint and compare the alert with expected generated activity.
3. Record a containment option, remediation actions, and validation steps.
4. Recheck endpoint telemetry and document what was observed.

## Evidence

| Evidence | What it demonstrates |
| --- | --- |
| [Draft iptables containment](./screenshots/draft-iptables-containment.jpg) | A **drafted-for-evidence** host firewall containment configuration. The target address is redacted and this image does not prove that every rule was executed. |
| [Azure NSG deny diagnostic](./screenshots/azure-nsg-deny-diagnostic.jpg) | Azure’s diagnostic view showing traffic denied by a default inbound NSG rule. The public source address and resource identifiers are redacted. |

## Azure lab notes

I connected an Azure Ubuntu endpoint to the monitoring lab, reviewed SSH-related activity, and used lightweight deception/honeypot-style services to observe unsolicited probing. I reviewed source/geolocation context and blocked selected sources during lab work, but I do not claim a fully automated active-response pipeline or continuous production monitoring.

## Related material

- [Simulated Wazuh incident response](../technical-writeups/writeups/simulated-wazuh-incident-response.md)
- [Azure deception and monitoring lab](../technical-writeups/writeups/azure-deception-and-monitoring-lab.md)
