# Controlled Network Assessment

## Scope

An authorised security assessment was performed against a controlled lab target. The assessment used ping, Nmap, `curl -I`, Nikto, and tcpdump on the relevant VPN interface.

## What was observed

Service discovery identified exposed FTP, SSH, HTTP, SMB, MySQL, and a further HTTP service. The review recorded outdated service versions, HTTP without encryption, directory indexing, and missing HTTP security headers. TCP capture confirmed expected ICMP traffic between the lab testing host and the target over the VPN interface.

## Interpretation

The findings indicate an unnecessarily broad attack surface and several configuration risks. They do not establish successful exploitation. Severity and prioritisation were assessed in the controlled-lab context.

## Recommended treatment

Patch outdated components; remove unnecessary services; replace FTP with SFTP; enforce HTTPS; restrict administrative, database, and file-sharing services; disable directory indexing; add security headers; and continue authorised monitoring and validation.
