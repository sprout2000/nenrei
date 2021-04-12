import React from 'react';
import Slide, { SlideProps } from '@material-ui/core/Slide';

/**
 * Omit
 * type Omit<T, K extends keyof any>
 * 型 T の中から、キー名が K に当てはまるプロパティを除外した新しい型を返す
 */
type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionDown: React.FC<TransitionProps> = (props) => (
  <Slide {...props} direction="down" />
);

export default TransitionDown;
