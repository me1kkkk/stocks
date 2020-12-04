import React from 'react';
import { Searchbar } from './styled';
import { IInput } from '../../shared/types';

const SearchbarComponent = ({ onChange }: IInput) => {
    return (
        <Searchbar>
            <input type="text" placeholder="Symbol" onChange={onChange} />
        </Searchbar>
    );
};

export default SearchbarComponent;
