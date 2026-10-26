import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmTableImports } from '../index';

interface Invoice {
    invoice: string;
    paymentStatus: string;
    totalAmount: string;
    paymentMethod: string;
}

const INVOICES: Invoice[] = [
    { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
    { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
    { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
    { invoice: 'INV004', paymentStatus: 'Paid', totalAmount: '$450.00', paymentMethod: 'Credit Card' },
    { invoice: 'INV005', paymentStatus: 'Paid', totalAmount: '$550.00', paymentMethod: 'PayPal' },
];

const meta: Meta = {
    title: 'Layout/Table',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmTableImports, HlmButton],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        props: {
            invoices: INVOICES,
        },
        template: `
            <div hlmTableContainer class="border rounded-md">
                <table hlmTable>
                    <caption hlmTableCaption>A list of your recent invoices.</caption>
                    <thead hlmTableHeader>
                        <tr hlmTableRow>
                            <th hlmTableHead class="w-[100px]">Invoice</th>
                            <th hlmTableHead>Status</th>
                            <th hlmTableHead>Method</th>
                            <th hlmTableHead class="text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody hlmTableBody>
                        @for (invoice of invoices; track invoice.invoice) {
                            <tr hlmTableRow>
                                <td hlmTableCell class="font-medium">{{ invoice.invoice }}</td>
                                <td hlmTableCell>{{ invoice.paymentStatus }}</td>
                                <td hlmTableCell>{{ invoice.paymentMethod }}</td>
                                <td hlmTableCell class="text-right">{{ invoice.totalAmount }}</td>
                            </tr>
                        }
                    </tbody>
                    <tfoot hlmTableFooter>
                        <tr hlmTableRow>
                            <td hlmTableCell [attr.colSpan]="3">Total</td>
                            <td hlmTableCell class="text-right font-bold">$1,750.00</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `,
    }),
};

export const WithSelectedRows: Story = {
    render: () => ({
        props: {
            invoices: INVOICES,
        },
        template: `
            <div hlmTableContainer class="border rounded-md">
                <table hlmTable>
                    <thead hlmTableHeader>
                        <tr hlmTableRow>
                            <th hlmTableHead class="w-[100px]">Invoice</th>
                            <th hlmTableHead>Status</th>
                            <th hlmTableHead>Method</th>
                            <th hlmTableHead class="text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody hlmTableBody>
                        @for (invoice of invoices; track invoice.invoice; let idx = $index) {
                            <tr hlmTableRow [attr.data-state]="idx === 1 || idx === 3 ? 'selected' : null">
                                <td hlmTableCell class="font-medium">{{ invoice.invoice }}</td>
                                <td hlmTableCell>{{ invoice.paymentStatus }}</td>
                                <td hlmTableCell>{{ invoice.paymentMethod }}</td>
                                <td hlmTableCell class="text-right">{{ invoice.totalAmount }}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        `,
    }),
};
