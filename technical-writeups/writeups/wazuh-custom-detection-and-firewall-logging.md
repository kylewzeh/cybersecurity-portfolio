# Wazuh custom detection and firewall logging

## Goal

I wanted a generated network-scan event to become a reviewable Wazuh alert through a traceable lab pipeline:

**Nmap scan → iptables logging → host log → Wazuh agent → Wazuh manager → rule/alert**

This is not a claim that Wazuh natively detects Nmap. The relevant detection depends on host logging and the Wazuh rules I configured.

## Rule evidence

The [base rule](../../wazuh-defensive-security-lab/screenshots/wazuh-custom-iptables-rule.jpg) matches an `IPTABLES` field and uses a low base severity. The [correlation rule](../../wazuh-defensive-security-lab/screenshots/wazuh-firewall-correlation-rule.jpg) shows a higher severity with frequency/timeframe logic for repeated firewall-drop events.

## Troubleshooting and validation

I encountered a rule-collision issue after the iptables log prefix changed. I adjusted the approach and retested rather than assuming the first configuration was valid. That experience reinforced the need to inspect the original log shape, rule match conditions, severity, and alert frequency together.

## Boundary

The screenshots demonstrate rule configuration and alert logic in a controlled lab. They do not prove universal detection coverage, production tuning, or automatic response.
