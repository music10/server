/**
 * Util for random sort arrays
 * @param array any array
 * @return array with random sort
 */
export const randomSort = <T>(array: T[]) =>
  array.sort(() => Math.random() - 0.5);
