# Simulated Wazuh Incident Response

## Scope

This case study documents a controlled simulation involving a Juice Shop VM, a Kali Linux VM, Wazuh monitoring, a brute-force attempt, and an unauthorised file change. It is not a production incident.

## Response summary

Wazuh was used to investigate authentication and integrity indicators. The lab response scoped the affected endpoint using Wazuh inventory and File Integrity Monitoring, applied an `iptables` block to the lab attacker host, removed the identified unauthorised file, applied updates, and verified Wazuh communication after recovery.

## Key learning

The exercise linked monitoring, containment, remediation, and recovery rather than treating alerts as isolated events. Controls and outcomes described here are limited to the lab simulation; no claim is made of enterprise deployment or real-world impact.
