import { Expense, Transaction } from './types';
import { GROUP_MEMBERS } from './constants';

export const compressImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 500; // Increased slightly for better visibility
                const scaleFactor = MAX_WIDTH / img.width;
                const width = MAX_WIDTH;
                const height = img.height * scaleFactor;
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                } else {
                    reject(new Error('Canvas context is null'));
                }
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

export const calculateSettlement = (expenses: Expense[]): Transaction[] => {
    const netBalance = new Map<string, number>();
    
    // Initialize
    GROUP_MEMBERS.forEach(member => netBalance.set(member, 0));

    // Calculate Net Balance
    expenses.forEach(expense => {
        const payerBalance = netBalance.get(expense.payer) || 0;
        netBalance.set(expense.payer, payerBalance + expense.twd);

        expense.participants.forEach(participant => {
            const currentBalance = netBalance.get(participant) || 0;
            netBalance.set(participant, currentBalance - expense.twdPerPerson);
        });
    });

    const creditors: { name: string; amount: number }[] = [];
    const debtors: { name: string; amount: number }[] = [];

    netBalance.forEach((amount, name) => {
        if (amount > 0.5) {
            creditors.push({ name, amount });
        } else if (amount < -0.5) {
            debtors.push({ name, amount: -amount });
        }
    });

    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    const transactions: Transaction[] = [];
    let i = 0; // debtors index
    let j = 0; // creditors index
    const tolerance = 0.5;

    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];

        if (debtor.amount < tolerance) {
            i++;
            continue;
        }
        if (creditor.amount < tolerance) {
            j++;
            continue;
        }

        const amountToTransfer = Math.min(debtor.amount, creditor.amount);

        transactions.push({
            from: debtor.name,
            to: creditor.name,
            amount: Math.round(amountToTransfer)
        });

        debtor.amount -= amountToTransfer;
        creditor.amount -= amountToTransfer;

        if (debtor.amount < tolerance) i++;
        if (creditor.amount < tolerance) j++;
    }

    return transactions;
};