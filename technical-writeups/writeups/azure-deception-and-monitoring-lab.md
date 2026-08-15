# Azure deception and monitoring lab

## Scope

I used an Azure Ubuntu lab endpoint as an additional monitoring target. The work was self-directed practice and is not presented as production cloud-security engineering.

## What I observed

I connected the endpoint to the monitoring lab, reviewed SSH-related activity, and used lightweight deception/honeypot-style services to observe unsolicited probes. I also reviewed source and geolocation context and blocked selected sources during the lab. The available evidence does not justify a claim of automated active response or continuous managed monitoring.

## Network-control evidence

The [Azure NSG diagnostic](../../incident-response-lab/screenshots/azure-nsg-deny-diagnostic.jpg) visibly shows traffic denied by the default inbound NSG rule. The public source address and Azure resource identifiers are redacted. This is evidence of diagnostic review, not proof of a customised NSG rule set.
