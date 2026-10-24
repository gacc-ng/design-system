import { BrnInputOtpImports } from '@spartan-ng/brain/input-otp';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmInputOtpImports } from '../index';

const meta: Meta = {
    title: 'Primitives/Input OTP',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmInputOtpImports, BrnInputOtpImports],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <brn-input-otp hlmInputOtp length="6" inputClass="disabled:cursor-not-allowed">
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
                <brn-input-otp hlmInputOtp [disabled]="true" value="123456" length="6" inputClass="disabled:cursor-not-allowed">
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

export const Invalid: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <brn-input-otp hlmInputOtp length="6" inputClass="disabled:cursor-not-allowed">
                    <hlm-input-otp-group>
                        <hlm-input-otp-slot index="0" [forceInvalid]="true" />
                        <hlm-input-otp-slot index="1" [forceInvalid]="true" />
                        <hlm-input-otp-slot index="2" [forceInvalid]="true" />
                    </hlm-input-otp-group>
                    <hlm-input-otp-separator />
                    <hlm-input-otp-group>
                        <hlm-input-otp-slot index="3" [forceInvalid]="true" />
                        <hlm-input-otp-slot index="4" [forceInvalid]="true" />
                        <hlm-input-otp-slot index="5" [forceInvalid]="true" />
                    </hlm-input-otp-group>
                </brn-input-otp>
            </div>
        `,
    }),
};
