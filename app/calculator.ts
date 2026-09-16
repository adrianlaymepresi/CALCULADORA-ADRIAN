export type Operation = '+' | '-' | '*' | '/' | 'negate' | 'sqrt' | '%' | '^' | 'square';

export function memoryAdd(mem: number, current: number): number {
  return mem + current;
}
export function memorySubtract(mem: number, current: number): number {
  return mem - current;
}

export function negateValue(val: number): number {
  return -val;
}

export interface CalcState {
  display: string;
  prev: number | null;
  op: Operation | null;
}

export function resetCalculatorState(): CalcState {
  return { display: '0', prev: null, op: null };
}

export function clearHistory(): [] {
  return [];
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: number;
  timestamp: string;
}

export function appendDecimal(current: string): string {
  if (current.includes('.')) return current;
  return current + '.';
}

export function calculate(a: number, b: number, op: Operation): number {
  let result: number;
  switch (op) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/':
      if (b === 0) throw new Error('ERR_DIV_ZERO');
      result = a / b;
      break;
    case '%': result = (a * b) / 100; break;
    case '^': result = Math.pow(a, b); break;
    case 'square': result = Math.pow(b, 2); break;
    case 'negate': result = -b; break;
    case 'sqrt': result = Math.sqrt(b); break;
    default: result = b;
  }
  // Corrección de precisión a 8 decimales:
  return Math.round((result + Number.EPSILON) * 1e8) / 1e8;
}

export function removeLastChar(display: string): string {
  if (display.length <= 1 || (display.length === 2 && display.startsWith('-'))) {
    return '0';
  }
  return display.slice(0, -1);
}

export function addHistoryEntry(
  history: HistoryItem[],
  a: number,
  b: number,
  op: Operation,
  result: number
): HistoryItem[] {
  const item: HistoryItem = {
    id: Date.now().toString(),
    expression: `${a} ${op} ${b}`,
    result,
    timestamp: new Date().toLocaleTimeString(),
  };
  return [item, ...history.slice(0, 9)]; // guarda los últimos 10
}