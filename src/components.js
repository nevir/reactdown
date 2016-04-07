/**
 * @copyright 2016-present, Reactdown team
 * @flow
 */

import React from 'react';

export function heading({level, ...props}) {
  let Component = 'h' + (level > 6 ? 6 : level);
  return <Component {...props} />;
}