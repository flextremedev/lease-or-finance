import { MatcherFunction } from '@testing-library/react';

export const createMatchRegexSeparatedByTags = (
  textToMatch: RegExp
): MatcherFunction => {
  const hasText = (node: Element): boolean =>
    node.textContent !== null ? textToMatch.test(node.textContent) : false;
  return (_content: string, node: Element | null): boolean => {
    if (!node) {
      return false;
    }
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );

    return nodeHasText && childrenDontHaveText;
  };
};
