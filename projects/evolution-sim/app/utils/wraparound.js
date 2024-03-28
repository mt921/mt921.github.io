export function wraparound(newPosition, offset, simSize) {
  const upperBound = simSize + offset;
  const lowerBound = 0 - offset;
  if (newPosition > lowerBound && newPosition < upperBound) {
    return newPosition;
  } else if (newPosition > upperBound) {
    let remainder = newPosition % upperBound;
    return lowerBound + remainder;
  } else if (newPosition < lowerBound) {
    let remainder = newPosition % upperBound;
    return upperBound + remainder;
  }
}
