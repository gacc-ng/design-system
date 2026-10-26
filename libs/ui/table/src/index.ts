import { HlmCaption } from './lib/hlm-caption';
import { HlmTable } from './lib/hlm-table';
import { HlmTableContainer } from './lib/hlm-table-container';
import { HlmTBody } from './lib/hlm-tbody';
import { HlmTd } from './lib/hlm-td';
import { HlmTFoot } from './lib/hlm-tfoot';
import { HlmTh } from './lib/hlm-th';
import { HlmTHead } from './lib/hlm-thead';
import { HlmTr } from './lib/hlm-tr';

export * from './lib/hlm-caption';
export * from './lib/hlm-table';
export * from './lib/hlm-table-container';
export * from './lib/hlm-tbody';
export * from './lib/hlm-td';
export * from './lib/hlm-tfoot';
export * from './lib/hlm-th';
export * from './lib/hlm-thead';
export * from './lib/hlm-tr';

export const HlmTableImports = [
    HlmCaption,
    HlmTableContainer,
    HlmTable,
    HlmTBody,
    HlmTd,
    HlmTFoot,
    HlmTh,
    HlmTHead,
    HlmTr,
] as const;
