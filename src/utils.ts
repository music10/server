/**
 * Util for random sort arrays
 * @param array any array
 * @return array with random sort
 */
export const randomSort = <T>(array: T[]) =>
  array.sort(() => Math.random() - 0.5);

/**
 * Util for get random number from 0
 * @param {number} max - max number cat generated
 * @return random integer
 */
export const randomIntByMax = (max: number) =>
  Math.floor(Math.random() * (max + 1));
