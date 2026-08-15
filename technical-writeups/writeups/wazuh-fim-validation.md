# Wazuh File Integrity Monitoring validation

## Goal

I used controlled file creation, modification, movement, and deletion to validate Wazuh File Integrity Monitoring in a lab. I compared monitored locations with actions outside the monitored scope to understand the difference in telemetry.

## Evidence

The [sanitised FIM event](../../wazuh-defensive-security-lab/screenshots/wazuh-file-integrity-monitoring.jpg) shows a monitored file path and integrity-change context. It is one representative event; it does not show every individual test action.

## What I learned

FIM is useful only when the monitored paths, timing, and expected-baseline changes are understood. In this lab, a roughly one-minute FIM interval meant that I needed to wait before judging whether a controlled change had been detected.

## Boundary

This work validates behaviour in a small lab configuration. It does not claim enterprise-wide file baselining or a complete change-management process.
