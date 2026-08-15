# Simulated Wazuh incident response

## Scope

This is a controlled lab simulation involving Wazuh monitoring, generated authentication/integrity activity, and a vulnerable lab endpoint. It is not a live organisational incident.

## Triage and investigation

I used Wazuh as the investigation entry point: identify the affected agent, read the rule and severity, inspect the event fields and original log, and compare the event with expected lab activity. The [sanitised authentication-event view](../../wazuh-defensive-security-lab/screenshots/wazuh-authentication-alert-investigation.jpg) illustrates the kind of event detail reviewed; sensitive values are intentionally obscured.

I also used FIM validation to check whether controlled file activity was reported. The published [integrity event](../../wazuh-defensive-security-lab/screenshots/wazuh-file-integrity-monitoring.jpg) is representative evidence, not a complete incident timeline.

## Containment and recovery

The [iptables image](../../incident-response-lab/screenshots/draft-iptables-containment.jpg) is explicitly marked **Drafted for Evidence**. It documents a proposed containment configuration for the lab scenario; it must not be read as proof that each command was applied or that a production incident was contained.

The wider exercise reinforced a simple workflow: preserve the alert context, scope the endpoint, document the proposed control, remediate only within authorised lab scope, and confirm that Wazuh telemetry is available again.

## Learning

Alert counts alone are not enough. Useful investigation depended on source event context, agent health, rule logic, timing, and a clear distinction between observed evidence and recommended follow-up.
