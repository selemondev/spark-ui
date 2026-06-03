# Review SparkUI Agent Component Port

Review the generated port as a SparkUI maintainer.

Check the implementation against these requirements:

- The component is a Vue 3 and TypeScript implementation, not a React translation left in place.
- The visual output, props, slots, events, and interactions match the MagicUI component.
- Docs and examples are present and render the new component.
- Tests cover meaningful behavior or rendering guarantees.
- No forbidden dependencies or patterns were introduced.
- Motion behavior is preserved with Motion for Vue when the source used Framer Motion.
- Repository normalization ran and the PR includes a `Repository Cleanup` report.
- New and renamed repository artifacts use kebab-case file names.
- The PR title follows `feat(component-name): add SparkUI port`.
- Human approval happens before merge.

Reject the PR if the implementation replaces advanced motion behavior with plain CSS or silently drops interactions from the source component.
