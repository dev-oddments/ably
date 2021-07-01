import { get, numberPad, convertSecondsToMinute } from './snippet';

test('react-redux useSelector 사용을 단순화하는 get의 동작이 올바르게 되는지 확인한다', () => {
  const state = {
    name: 'number',
  };

  const f = get('name');
  const g = get('age');

  expect(f(state)).toBe('number');
  expect(g(state)).toBeUndefined();
});

test('numberPad를 사용하여 한자리이면 앞에 0을 붙일 수 있다.', () => {
  expect(numberPad(0)).toBe('00');
  expect(numberPad(10)).toBe('10');
});

test('convertSecondsToMinute을 사용하여 60초가 넘어가는 초가 입력되면 mm:ss형태로 변환한다', () => {
  expect(convertSecondsToMinute(100)).toBe('01:40');
  expect(convertSecondsToMinute(1)).toBe('00:01');
  expect(convertSecondsToMinute(60)).toBe('01:00');
  expect(convertSecondsToMinute(0)).toBe('00:00');
});
