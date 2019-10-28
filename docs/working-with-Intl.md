# Working with Intl

## Setup

We use `react-intl` to provide intl feature in to Neufund Platform app. When using `react-intl` use
`react-intl-phraseapp` instead. This is a wrapper that connects our translations with a tool that
enables direct change.

All strings used by the app need to be statically extractable. We use `babel@7` (it parses
typescript code) + enhanced `babel-plugin-react-intl` to allow so. We extract them and build default
`intl/locales/en-en.json` file based on found string. If you want to modify english version (default
translation) just do so in `en-en.json` file. Strings are wrapped in React.Fragment by default,
because of that if you want to use `<FormattedHTMLMessage>` then you have to add `tagName="span"`
prop to it.

To make you code extractable you need to:

- always import `react-intl-phraseapp` when using `<FormattedHTMLMessage>` or `<FormattedMessage>`
- always use literals so no variables etc
- create FormattedMessage component with `id` prop
- if you need to pass translated value as a string use `injectIntlHelpers` HoC and then call
  `formatIntlMessage` function (this name should not be used for non intl things) and pass id as a
  first arg

## Usage

To extract all ids from the source code do:

```
yarn intl:extract
```

It will create tmp messages files at `intl/messages` (it's git ignored) and it will combine them in
`intl/locales/en-en.json` leaving already translated ids.
