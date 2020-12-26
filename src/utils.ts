/**
 * Util for random sort arrays
 * @param array
 * @return random sorted array
 */
export const randomSort = <T>(array: T[]) =>
  array.sort(() => Math.random() - 0.5);
