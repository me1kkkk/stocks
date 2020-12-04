export interface IInput {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IButton {
    label: string;
    onClick: any;
    variant?: 'text' | 'outlined' | 'contained' | undefined;
    color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
}

export interface IModal {
    open: boolean;
    onClose: any;
    isLoading: boolean;
}

export interface IStockCard {
    name: string;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    currentPrice: number;
    closePrice: number;
}
