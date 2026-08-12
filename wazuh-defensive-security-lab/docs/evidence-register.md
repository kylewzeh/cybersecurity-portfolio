# Evidence Register

| Area | Evidence reviewed | Portfolio wording | Status |
| --- | --- | --- | --- |
| Endpoint monitoring | Wazuh monitoring of Ubuntu Desktop VM | Monitored endpoint activity in a controlled lab | Performed in a controlled lab |
| File Integrity Monitoring | Wazuh FIM used to identify an unauthorised file change | Used Wazuh File Integrity Monitoring during a simulated incident exercise | Simulated incident |
| Configuration assessment | Wazuh Security Configuration Assessment aligned to CIS benchmarks | Ran Security Configuration Assessment checks and reviewed hardening posture | Performed in a controlled lab |
| Network monitoring | `tshark` used to monitor packet flows | Used `tshark` to observe packet flows and investigate unusual traffic patterns | Performed in a controlled lab |
| Containment | `iptables` rule described for blocking the Kali VM IP | Applied an `iptables` containment control in the simulated lab scenario | Simulated incident |
| Recovery | WSL2 export backups and weekly test restoration described | Created WSL2 export backups and exercised restoration | Performed in a controlled lab |

Published screenshots: [Security Configuration Assessment](../screenshots/wazuh-security-configuration-assessment.jpg) and [File Integrity Monitoring](../screenshots/wazuh-file-integrity-monitoring.jpg). They were extracted from the submitted practical material and exclude assessment pages and student information.

Do not add unredacted screenshots, internal addresses, assessment pages, or source documents to this repository.
