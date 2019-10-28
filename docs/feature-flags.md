# Feature flags

Feature flags need to have one of two values: `0` (disabled) or `1` (enabled).

They are not part of the app config. Use them directly by accessing process.env.

Code disabled by feature flag will be entirely stripped from build.

## List

```
NF_FEATURE_EMAIL_CHANGE_ENABLED
NF_USER_INFO_COMPONENT_ENABLED
NF_ISSUERS_CAN_LOGIN_WITH_ANY_WALLET
NF_ISSUERS_ENABLED
NF_ISSUERS_SECRET - if NF_ISSUERS_ENABLED===1 and provided issuer access will be protected by additional secret value
NF_WITHDRAW_ENABLED
```
