import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { IStockCard } from '../../shared/types';

const StockCard = ({
    name,
    openPrice,
    highPrice,
    lowPrice,
    currentPrice,
    closePrice,
}: IStockCard) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" color="textSecondary" gutterBottom>
                    {name}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                    Current price {currentPrice}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                    Open price {openPrice}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                    High price {highPrice}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                    Low price {lowPrice}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                    Previous close price {closePrice}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StockCard;
