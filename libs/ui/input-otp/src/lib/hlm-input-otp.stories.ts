import { BrnInputOtpImports } from '@spartan-ng/brain/input-otp';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmInputOtpImports } from '../index';

import { HlmInputOtp } from './hlm-input-otp';

interface InputOtpStoryArgs {
    length: number;
    disabled: boolean;
}

const meta: Meta<InputOtpStoryArgs> = {
    title: 'Primitives/Input OTP',
    component: HlmInputOtp,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmInputOtpImports, BrnInputOtpImports],
        }),
    ],
    argTypes: {
        length: {
            control: 'number',
            description: 'The number of characters/digits in the one-time passcode.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '6' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the OTP inputs are interactively disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
    args: {
        length: 6,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<InputOtpStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 flex justify-center">
                <brn-input-otp hlmInputOtp [length]="length" [disabled]="disabled" inputClass="disabled:cursor-not-allowed">
                    <hlm-input-otp-group>
                        <hlm-input-otp-slot index="0" />
                        <hlm-input-otp-slot index="1" />
                        <hlm-input-otp-slot index="2" />
                    </hlm-input-otp-group>
                    <hlm-input-otp-separator />
                    <hlm-input-otp-group>
                        <hlm-input-otp-slot index="3" />
                        <hlm-input-otp-slot index="4" />
                        <hlm-input-otp-slot index="5" />
                    </hlm-input-otp-group>
                </brn-input-otp>
            </div>
        `,
    }),
};

export const FourDigits: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <brn-input-otp hlmInputOtp length="4" inputClass="disabled:cursor-not-allowed">
                    <hlm-input-otp-group>
                        <hlm-input-otp-slot index="0" />
                        <hlm-input-otp-slot index="1" />
                        <hlm-input-otp-slot index="2" />
                        <hlm-input-otp-slot index="3" />
                    </hlm-input-otp-group>
                </brn-input-otp>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <brn-input-otp hlmInputOtp length="6" [disabled]="true" inputClass="disabled:cursor-not-allowed">
                    <hlm-input-otp-group>
                        <hlm-input-otp-slot index="0" />
                        <hlm-input-otp-slot index="1" />
                        <hlm-input-otp-slot index="2" />
                    </hlm-input-otp-group>
                    <hlm-input-otp-separator />
                    <hlm-input-otp-group>
                        <hlm-input-otp-slot index="3" />
                        <hlm-input-otp-slot index="4" />
                        <hlm-input-otp-slot index="5" />
                    </hlm-input-otp-group>
                </brn-input-otp>
            </div>
        `,
    }),
};
