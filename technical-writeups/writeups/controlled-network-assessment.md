# Controlled network enumeration and authorised lab testing

## Scope

I performed discovery and testing only against authorised, intentionally vulnerable coursework/lab hosts. The published evidence removes target addresses and does not include credentials, database contents, exploit payloads, or formative assessment material.

## Evidence-led observations

The [sanitised Nmap result](../../network-security-assessment/screenshots/nmap-service-enumeration-sanitized.jpg) shows FTP, SSH, and HTTP open with service/version detection. This establishes exposed services and software banners in the lab; it does not establish a compromise or a vulnerability by itself.

The [sanitised session evidence](../../network-security-assessment/screenshots/metasploit-authorised-session-sanitized.jpg) shows a command-shell session and a basic identity check in an intentionally vulnerable environment. It is included only as proof of authorised lab practice, not as a guide to exploitation.

During the controlled test, I also used Wireshark, tshark, and tcpdump to confirm expected generated traffic. The raw packet-capture screenshots required too much redaction to remain useful, so they are not included in the public evidence set.

## Other authorised practice

The lab also included controlled SSH/Hydra and SQL injection/SQLmap exercises against authorised vulnerable services. I do not publish recovered passwords, wordlists, database enumeration output, request payloads, or target information.

## Defensive treatment

In a comparable authorised environment, I would validate service ownership, remove unused listeners, patch supported components, use encrypted administration/file transfer, restrict administrative and database exposure, and re-test after changes. Those are recommendations, not claims that every control was implemented in this lab.
