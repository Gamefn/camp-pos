export interface CamperAccount {
  id: string;
  name: string;
  camperId: string;
  cabin: string;
  balance: number;
  spendingLimit: number;
}

export interface TransactionItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface TransactionPayload {
  camperId: string | null;
  camperName: string | null;
  paymentMethod: 'Camp Credit' | 'Cash';
  amount: number;
  items: TransactionItem[];
}

export interface TransactionLogEntry {
  id: string;
  camperId: string | null;
  camperName: string | null;
  paymentMethod: 'Camp Credit' | 'Cash';
  amount: number;
  items: TransactionItem[];
  createdAt: string;
  previousBalance: number | null;
  newBalance: number | null;
  balanceDelta: number | null;
}

const roundCurrency = (value: number) => Math.round(value * 100) / 100;

export function applyTransactionToCampers(
  campers: CamperAccount[],
  transaction: TransactionPayload,
): { campers: CamperAccount[]; logEntry: TransactionLogEntry } {
  const previousBalance = transaction.camperId
    ? campers.find((camper) => camper.id === transaction.camperId)?.balance ?? null
    : null;

  let newBalance: number | null = previousBalance;

  if (transaction.paymentMethod === 'Camp Credit' && transaction.camperId) {
    const camper = campers.find((entry) => entry.id === transaction.camperId);
    if (!camper) {
      throw new Error('Camper not found');
    }

    if (transaction.amount > camper.balance + 1e-9) {
      throw new Error('Insufficient camper balance');
    }

    newBalance = roundCurrency(camper.balance - transaction.amount);
    camper.balance = newBalance;
  }

  const logEntry: TransactionLogEntry = {
    id: `txn-${Date.now()}`,
    camperId: transaction.camperId,
    camperName: transaction.camperName,
    paymentMethod: transaction.paymentMethod,
    amount: roundCurrency(transaction.amount),
    items: transaction.items,
    createdAt: new Date().toISOString(),
    previousBalance: previousBalance === null ? null : roundCurrency(previousBalance),
    newBalance: newBalance === null ? null : roundCurrency(newBalance),
    balanceDelta: previousBalance === null || newBalance === null ? null : roundCurrency(newBalance - previousBalance),
  };

  return { campers, logEntry };
}
