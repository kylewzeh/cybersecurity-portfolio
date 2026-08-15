# Evidence register

| Area | Published evidence | Evidence-bounded portfolio wording | Status |
| --- | --- | --- | --- |
| Agent monitoring | [Agent status](../screenshots/wazuh-agent-status.jpg) | Reviewed agent operating system, version, and connection state in a Wazuh lab. | Performed in controlled lab |
| Alert review | [Port-change alert](../screenshots/wazuh-port-change-alert.jpg) and [authentication event](../screenshots/wazuh-authentication-alert-investigation.jpg) | Inspected rules, severity, agent context, and original event details during generated lab activity. | Performed in controlled lab |
| Custom detection | [Custom iptables rule](../screenshots/wazuh-custom-iptables-rule.jpg) and [correlation rule](../screenshots/wazuh-firewall-correlation-rule.jpg) | Created and retested rules for iptables-formatted lab events and repeated firewall drops. | Performed in controlled lab |
| FIM | [Integrity event](../screenshots/wazuh-file-integrity-monitoring.jpg) | Validated file-integrity monitoring using controlled file changes. | Performed in controlled lab |
| SCA | [CIS-aligned assessment](../screenshots/wazuh-security-configuration-assessment.jpg) | Reviewed Wazuh SCA results against the CIS Ubuntu 22.04 benchmark. | Performed in controlled lab |
| Containment | [Draft iptables configuration](../../incident-response-lab/screenshots/draft-iptables-containment.jpg) | Documented a proposed host-firewall containment configuration for the simulated scenario. | Drafted for evidence; execution not inferred |

The public images are sanitised derivatives. They omit assessment pages, credentials, direct addresses, infrastructure names, and original source documents.
