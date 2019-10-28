# Component development guidelines

## Visual

- no padding / margin for components — it should be added by parent
  - using bootstrap grid is fine as long as row is not a parent component — it adds negative margin
    which breaks this rule
- block components should take all space available and be responsive
- inline components should contain as much space as they need

## Type system

- prefer enums over string literal union types
- use type system to express complicated prop types (ex. use union type if component can take a
  little bit different props depending on some flag)
- functional components should always be of type React.FunctionComponent
- use following style:
  - Prefix for types (I for interface, T for type E for enums)
  - have uppercase keys in enums

```javascript
interface IMyInterface {}

type TMyType = string

enum EMyEnum {
  UPPERCASE_CONSTANT = "uppercase_constant"
}
```

## External Links

When using an external link do not use `<a>` due to security concerns but use directly but
`<ExternalLink>` instead
